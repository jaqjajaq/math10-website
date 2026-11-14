import { useProgress } from '@react-three/drei'
import { useEffect } from 'react'

type Props = { ready: boolean; visible: boolean; onDone: () => void }

const LoadingScreen = ({ ready, visible, onDone }: Props) => {
    const { progress } = useProgress()
    const shown = ready ? 100 : Math.min(progress, 99)

    useEffect(() => {
        if (!ready || !visible) return

        const t = setTimeout(onDone, 300)
        return () => clearTimeout(t)
    }, [ready, visible, onDone])

    return (
        <div
            className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-4 bg-black transition-opacity duration-200 ease-out ${
                visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="h-1.5 w-[500px] max-w-[80vw] bg-[#222]">
                <div
                    className="h-full bg-[#CC338B] transition-[width] duration-300 ease-out"
                    style={{ width: `${shown}%` }}
                />
            </div>
            <div className="font-['Segoe_UI',sans-serif] text-2xl font-bold text-white">
                Searching for the food {shown.toFixed(0)}%
            </div>
        </div>
    )
}

export default LoadingScreen