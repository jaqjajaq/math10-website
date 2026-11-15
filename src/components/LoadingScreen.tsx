import { useProgress } from '@react-three/drei'

const LoadingScreen = () => {
    const { active, progress } = useProgress()
    const done = !active && progress === 100

    return (
        <div
            className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-4 bg-black transition-opacity duration-200 ease-out ${
                done ? 'opacity-0 pointer-events-none delay-300' : 'opacity-100'
            }`}
        >
            <img src="/WTF.svg" alt="Cafe wtf logo" className="h-30 w-30 animate-bounce" />
            <div className="h-1.5 w-[500px] max-w-[80vw] bg-[#222]">
                <div
                    className="h-full bg-[#CC338B] transition-[width] duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="font-['Segoe_UI',sans-serif] text-2xl font-bold text-white">
                Searching for the food {progress.toFixed(0)}%
            </div>
        </div>
    )
}

export default LoadingScreen