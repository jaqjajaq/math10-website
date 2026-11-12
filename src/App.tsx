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
            <Loader
                containerStyles={{ background: '#000000',}}
                innerStyles={{ width: 500, background: '#222' }}   
                barStyles={{ height: 6, background: '#CC338B' }}          
                dataStyles={{ fontSize: '24px', color: '#fff', fontFamily: 'Segoe UI', fontWeight: 700 }}
                dataInterpolation={(p) => `Searching for the food ${p.toFixed(0)}%`} 
                initialState={(active) => active}            

             />
        </div>
    )
}

useLoader.preload(ObjectLoader, MODEL_URL)