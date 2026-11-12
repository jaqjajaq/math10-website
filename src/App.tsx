import { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { ObjectLoader } from 'three'

const MODEL_URL = 'public/cafewtf.gltf.json'

function Model() {
    // three.js editor "Export JSON" uses the Object/Scene JSON format -> ObjectLoader
    const object = useLoader(ObjectLoader, MODEL_URL)
    return <primitive object={object} />
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
        </div>
    )
}

useLoader.preload(ObjectLoader, MODEL_URL)