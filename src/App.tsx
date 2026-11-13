import { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Loader } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_URL = '/cafe_tf_new_latest_2.glb.json'

function Model() {
    // three.js editor "Export JSON" uses the Object/Scene JSON format -> ObjectLoader
    const object = useLoader(THREE.ObjectLoader, MODEL_URL)
    return <primitive object={object} />
}

export default function App() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas camera={
                {
                    position: [100, 100, 100],
                    fov: 60,
                }
            }>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={1} />
                <Suspense fallback={null}>
                    <Model />
                </Suspense>
                <OrbitControls makeDefault
                               enablePan={false}
                               minDistance={70}
                               maxDistance={150}
                               maxPolarAngle={Math.PI / 2}
                />
            </Canvas>
            <Loader />
        </div>
    )
}

useLoader.preload(THREE.ObjectLoader, MODEL_URL)