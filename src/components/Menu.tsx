import MenuButton from "./MenuButton.tsx";

function openGithub() {
    window.open('https://github.com/jaqjajaq/math10-website', '_blank', 'noopener,noreferrer');
}

export default function Menu() {
    return <>
        <div className="fixed inset-8 p-2 z-[999] h-fit text-white bg-rose-800/60 backdrop-blur-3xl rounded-lg grid grid-cols-3 items-center">
            <h1 className="text-2xl font-serif font-bold">Cafe WTF: Where's The Food</h1>

            <span className="flex justify-center">Interact with certain objects, or click on the door to start!</span>

            <div className="flex flex-row justify-end gap-2">
                <MenuButton>About</MenuButton>
                <MenuButton>Credits</MenuButton>
                <MenuButton onClick={openGithub}>Github</MenuButton>
            </div>
        </div>
    </>
}