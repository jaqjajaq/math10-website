import { Suspense, useMemo, useEffect, useState, useCallback } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Environment, Sky, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import LoadingScreen from './components/LoadingScreen'
import StartScreen from './components/StartScreen'


const SUN_POSITION: [number, number, number] = [100, 50, 100] // NEW: shared by Sky + light
const MODEL_URL = '/exportedwtfcafenew.glb'



function Model({ onReady }: { onReady: () => void }) {
    const { scene } = useGLTF(MODEL_URL, false)

    useMemo(() => {
        const lightsToRemove: THREE.Object3D[] = []

        scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
                obj.castShadow = true
                obj.receiveShadow = true
            }
            if (obj instanceof THREE.Light) lightsToRemove.push(obj)
        })

        lightsToRemove.forEach((l) => l.removeFromParent())
    }, [scene])

    useEffect(() => {
        onReady()
    }, [onReady])

    return <primitive object={scene} />
}


export default function App() {
    const [phase, setPhase] = useState<'start' | 'loading' | 'playing'>('start')
    const [modelReady, setModelReady] = useState(false)
    const handleReady = useCallback(() => setModelReady(true), [])
    const handleDone = useCallback(() => setPhase('playing'), [])
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas shadows camera={
                {
                    position: [100, 100, 100],
                    fov: 60,
                }
            }>
                <Suspense fallback={null}>
                    {phase !== 'start' && <Model onReady={handleReady} />}
                    <Environment files="/venice_sunset_1k.hdr" />
                </Suspense>

                {/* CHANGED: ambient -> hemisphere (sky color on top, ground color below) */}
                <hemisphereLight args={['#ffe2c4', '#444455', 0.5]} />

                {/* CHANGED: sun matches the Sky's sun, casts shadows */}
                <directionalLight
                    position={SUN_POSITION}
                    intensity={2.5}
                    color="#ffcf9e"
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                    shadow-camera-near={1}
                    shadow-camera-far={400}
                    shadow-camera-left={-80}
                    shadow-camera-right={80}
                    shadow-camera-top={80}
                    shadow-camera-bottom={-80}
                    shadow-bias={-0.0005}
                />

                <Environment preset="sunset" /> 

                <Sky distance={450000} sunPosition={[100, 50, 100]} turbidity={8} rayleigh={2} />
                <OrbitControls makeDefault
                               enablePan={false}
                               minDistance={70}
                               maxDistance={150}
                               maxPolarAngle={Math.PI / 2}
                />
            </Canvas>
            {phase !== 'playing' && <StartScreen onStart={() => setPhase('loading')} />}
            {phase !== 'start' && (
                <LoadingScreen
                    ready={modelReady}
                    visible={phase === 'loading'}
                    onDone={handleDone}
                />
            )}
        </div>
    )
}

useGLTF.preload(MODEL_URL)
