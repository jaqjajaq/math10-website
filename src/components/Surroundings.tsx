import { Environment, Stars } from '@react-three/drei'

const NIGHT = '#05070f'

export default function Surroundings() {
    return <>
        <color attach="background" args={[NIGHT]} />
        <fog attach="fog" args={[NIGHT, 200, 600]} />   {/* ground fades into the sky instead of a hard horizon line */}

        <hemisphereLight args={['#2a3a5a', '#0a0a10', 0.05]} />
        <spotLight
            position={[0, 100, 5]}
            angle={0.7}          // ~29° half-angle, 0.3 may not cover the whole house
            penumbra={0.5}
            intensity={1000}
            decay={2}
            color="#ffe4c4"
            shadow-mapSize={[2048, 2048]}
        />
        <Environment preset="night" environmentIntensity={0.1} />

        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade />
    </>
}