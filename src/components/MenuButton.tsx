


export default function MenuButton({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
    return <button className="p-2 px-4 border border-rose-500 hover:bg-rose-500/50 transition-all rounded-md hover:cursor-pointer" onClick={onClick}>
        {children}
    </button>
}