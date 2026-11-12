import { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Loader } from '@react-three/drei'
import { ObjectLoader } from 'three'

const MODEL_URL = '/cafewtf.gltf.json'

function Model() {
    // three.js editor "Export JSON" uses the Object/Scene JSON format -> ObjectLoader
    const object = useLoader(ObjectLoader, MODEL_URL)
    return <primitive object={object} />
}

function Fallback() {
    return <p>Hello Just Wait :)</p>
}

export default function App() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={1} />
                <Suspense fallback={null}>
                    <Model />
                </Suspense>

                <OrbitControls makeDefault />
            </Canvas>
            <Loader />
        </div>
    )
}

useLoader.preload(ObjectLoader, MODEL_URL)