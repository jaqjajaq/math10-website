type Props = { onStart: () => void }

const StartScreen = ({ onStart }: Props) => (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 bg-[#1a0b0e] overflow-hidden">
        <img src="/cafe-wtf-logo.svg" alt="Cafe wtf logo"/>
        <button
            onClick={onStart}
            className="cursor-pointer rounded-full bg-[#CC338B] px-10 py-3 font-['Segoe_UI',sans-serif] text-xl font-bold text-[#F8F8F8] transition hover:scale-105 hover:brightness-120"
        >
            Enter
        </button>
    </div>
)

export default StartScreen