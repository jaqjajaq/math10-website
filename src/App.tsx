import { Suspense, useState, useLayoutEffect, useMemo } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Gltf, useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'

import * as THREE from 'three'

import Surroundings from './components/Surroundings.tsx'
import Menu from './components/Menu'
import LoadingScreen from "./components/LoadingScreen.tsx"
import StartScreen from './components/StartScreen'

const MODEL_URL = '/scene.glb'

function Model() {
    const { scene, nodes } = useGLTF(MODEL_URL)

    const signCenter = useMemo(() => {
        scene.updateMatrixWorld(true)
        const sign = scene.getObjectByName('Neon_Light') // ← your sign's name in Blender
        return sign
            ? new THREE.Box3().setFromObject(sign).getCenter(new THREE.Vector3())
            : null
    }, [scene])

    useLayoutEffect(() => {
        scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
                obj.castShadow = true
                obj.receiveShadow = true
            }
        })
    }, [scene])

    return <>
        <primitive object={scene} />
        {signCenter && (
            <pointLight
                position={[signCenter.x, signCenter.y, signCenter.z + 3]} // nudge toward the street
                color="#ffcc66"
                intensity={200}
                distance={30}
                decay={2}
            />
        )}
    </>
}

export default function App() {
    //const [started, setStarted] = useState(false)

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas shadows camera={{ position: [100, 100, 100], fov: 60 }}>
                <Suspense fallback={null}>
                    { /* <Gltf src={MODEL_URL} castShadow receiveShadow /> */ }
                    <Model />
                </Suspense>

                <Surroundings />

                <OrbitControls
                    makeDefault
                    enablePan={false}
                    minDistance={70}
                    maxDistance={150}
                    maxPolarAngle={Math.PI / 2}
                    target={[0, 10, 0]}
                />

                <EffectComposer>
                    <Bloom mipmapBlur luminanceThreshold={1} intensity={0.2} />
                    <ToneMapping />
                </EffectComposer>
            </Canvas>

            <LoadingScreen />
            <Menu />

            { /*
            {!started && <StartScreen onStart={() => setStarted(true)} />}
            {started && <LoadingScreen />}
            */ }
        </div>
    )
}

useGLTF.preload(MODEL_URL)