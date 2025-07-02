export default function Sidebar() {
    return (
        <div className="fixed p-6 z-20 h-[100dvh]">
            <div className="w-72 bg-[#17171d] p-6 shrink-0 border-2 border-white/25 h-full rounded-2xl drop-shadow-2xl drop-shadow-black/25">
                <div className="grid gap-3">
                    <span className="text-3xl font-bold font-display">
                        hackaplace
                    </span>
                    <span className="opacity-75 text-sm leading-relaxed">
                        The canvas is blank. You can place one pixel, then wait.
                        On your own, you can create something. With others, you
                        can create even more.
                    </span>
                </div>
            </div>
        </div>
    );
}
