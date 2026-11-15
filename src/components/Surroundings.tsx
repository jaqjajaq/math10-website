import { Environment, Sky, Stars } from '@react-three/drei'

const SUN_POSITION: [number, number, number] = [0, -100, 0]

export default function Surroundings() {
    return <>
        <hemisphereLight args={['#ffe2c4', '#444455', 0.5]} />

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

        <Environment preset="night" />

        <Sky distance={450000} sunPosition={SUN_POSITION} turbidity={8} rayleigh={2} />
        <Stars
            radius={300}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
        />
    </>
}