import { Suspense, useMemo, useEffect, useState, useCallback } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Environment, Sky, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import LoadingScreen from './components/LoadingScreen'
import StartScreen from './components/StartScreen'


const SUN_POSITION: [number, number, number] = [100, 50, 100] // NEW: shared by Sky + light
const MODEL_URL = '/cafe_tf_new_latest_2.glb.json'



function Model({ onReady }: { onReady: () => void }) {
    // three.js editor "Export JSON" uses the Object/Scene JSON format -> ObjectLoader
    const object = useLoader(THREE.ObjectLoader, MODEL_URL)

    useMemo(() => {
        const lightsToRemove: THREE.Object3D[] = []

        object.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
                obj.castShadow = true
                obj.receiveShadow = true

                const swap = (m: THREE.Material) =>
                    m instanceof THREE.MeshBasicMaterial
                        ? new THREE.MeshStandardMaterial({ color: m.color, map: m.map })
                        : m

                obj.material = Array.isArray(obj.material)
                    ? obj.material.map(swap)
                    : swap(obj.material)
            }
            if (obj instanceof THREE.Light) lightsToRemove.push(obj)
        })

        lightsToRemove.forEach((l) => l.removeFromParent())
    }, [object])

    useEffect(() => {
        onReady()
    }, [onReady])
    return <primitive object={object} />
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

                {/* <Environment preset="sunset" /> */}
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

useLoader.preload(THREE.ObjectLoader, MODEL_URL)