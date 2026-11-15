import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Gltf } from '@react-three/drei'

import Surroundings from "./components/Surroundings.tsx"
import LoadingScreen from './components/LoadingScreen'

const MODEL_URL = '/scene.glb'

export default function App() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas shadows camera={
                {
                    position: [100, 100, 100],
                    fov: 60,
                }
            }>
                <Suspense fallback={null}>
                    <Gltf src={MODEL_URL} castShadow receiveShadow />
                </Suspense>

                <Surroundings />

                <OrbitControls makeDefault
                               enablePan={false}
                               minDistance={70}
                               maxDistance={150}
                               maxPolarAngle={Math.PI / 2} // prevent rotating under ground
                               target={[0, 10, 0]}
                />
            </Canvas>

            <LoadingScreen />

            {/* <Loader
                containerStyles={{ background: '#000000',}}
                innerStyles={{ width: 500, background: '#222' }}   
                barStyles={{ height: 6, background: '#CC338B' }}          
                dataStyles={{ fontSize: '24px', color: '#fff', fontFamily: 'Segoe UI', fontWeight: 700 }}
                dataInterpolation={(p) => `Searching for the food ${p.toFixed(0)}%`} 
                initialState={(active) => active}            

             /> */}
        </div>
    )
}

useGLTF.preload(MODEL_URL);