import { Suspense, useMemo, useEffect, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

import Surroundings from './components/Surroundings.tsx'
import LoadingScreen from './components/LoadingScreen'
import StartScreen from './components/StartScreen'

const MODEL_URL = '/scene.glb'

// Replaces <Gltf castShadow receiveShadow /> so we can tell the loading screen when it's ready
function Model({ onReady }: { onReady: () => void }) {
    const { scene } = useGLTF(MODEL_URL)

    useMemo(() => {
        scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
                obj.castShadow = true
                obj.receiveShadow = true
            }
        })
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
            <Canvas shadows camera={{ position: [100, 100, 100], fov: 60 }}>
                <Suspense fallback={null}>
                    {phase !== 'start' && <Model onReady={handleReady} />}
                </Suspense>

                <Surroundings />

                <OrbitControls
                    makeDefault
                    enablePan={false}
                    minDistance={70}
                    maxDistance={150}
                    maxPolarAngle={Math.PI / 2} // prevent rotating under ground
                    target={[0, 10, 0]}
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