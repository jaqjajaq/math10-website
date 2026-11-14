type Props = { onStart: () => void }

const StartScreen = ({ onStart }: Props) => (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 bg-[#A64452]">
        <h1 className="font-['Segoe_UI',sans-serif] text-5xl font-bold text-white ">
            Welcome to
        </h1>
        <button
            onClick={onStart}
            className="cursor-pointer rounded-full bg-[#CC338B] px-10 py-3 font-['Segoe_UI',sans-serif] text-xl font-bold text-[#F8F8F8] transition hover:scale-105 hover:brightness-120"
        >
            Enter
        </button>
    </div>
)

export default StartScreen