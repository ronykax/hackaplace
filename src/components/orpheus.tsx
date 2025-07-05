import useBlobStore from "@/stores/blob";
import usePlacedStore from "@/stores/placed";
import useUserStore from "@/stores/user";
import updateCanvas from "@/utils/update-canvas";

export default function Orpheus() {
    const { user } = useUserStore();
    const { placed } = usePlacedStore();
    const { blob } = useBlobStore();

    async function handleConfirm() {
        console.log("blobbbb");
        if (!blob) return;

        await updateCanvas({ blob, user: user! });
    }

    function handleCancel() {
        window.location.reload();
    }

    return (
        <div
            className={`fixed bottom-0 right-0 p-4 z-20 duration-300 hover:-translate-x-1.5 ${
                placed ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="rounded-xl overflow-hidden w-80 border-2 border-white/25 p-6 bg-[#17171d] drop-shadow-2xl drop-shadow-black/25">
                <div className="flex flex-col gap-3">
                    <span className="font-semibold">are you sure?</span>
                    <span className="opacity-75 text-sm leading-relaxed">
                        you just placed a pixel on the canvas. click confirm to
                        lock it in - this action cannot be undone!
                    </span>
                </div>

                <div className="mt-6 flex gap-2">
                    <button
                        onClick={handleConfirm}
                        className="text-lg px-4 py-2 rounded-md bg-green-600/75 font-semibold duration-150 hover:bg-green-600/100 border-2 cursor-pointer border-white/25 w-full"
                    >
                        confirm
                    </button>
                    <button
                        onClick={handleCancel}
                        className="text-lg px-4 py-2 rounded-md bg-red-500/75 font-semibold duration-150 hover:bg-red-500/100 border-2 cursor-pointer border-white/25 w-full"
                    >
                        cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
