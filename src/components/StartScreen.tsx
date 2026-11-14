
import { useState } from 'react'

type Props = { onStart: () => void }

const StartScreen = ({ onStart }: Props) =>
{
    const [entered, setEntered] = useState(false)

    return (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 overflow-hidden bg-[#1a0b0e]">
            <img
                src="/cafe-wtf-logo.svg"
                alt="Cafe wtf logo"
                className={entered ? 'animate-flicker' : 'animate-flicker-in-1'}
                onAnimationEnd={(e) =>
                {
                    if (e.animationName === 'flicker-in-1')
                    {
                        setEntered(true)
                    }
                }}
            />

            <button
                onClick={onStart}
                className="cursor-pointer rounded-full bg-[#CC338B] px-10 py-3 font-['Segoe_UI',sans-serif] text-xl font-bold text-[#F8F8F8] transition hover:scale-105 active:brightness-150"
            >
                Enter
            </button>
        </div>
    )
}

export default StartScreen
