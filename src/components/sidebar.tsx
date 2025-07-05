import useCanvasDataStore from "@/stores/canvas";
import useUserStore from "@/stores/user";
import supabase from "@/utils/supabase";
import timeAgo from "@/utils/time-ago";
import { UserIdentity } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useCooldownStore } from "@/stores/cooldown";
import useColorStore from "@/stores/color";

export default function Sidebar() {
    const [opened, setOpened] = useState(false);
    const { user } = useUserStore();

    const [identity, setIdentity] = useState<
        UserIdentity["identity_data"] | null
    >(null);

    const { canvasData } = useCanvasDataStore();
    const { cooldown, setStartTime } = useCooldownStore();
    const { color, setColor } = useColorStore();

    useEffect(() => {
        if (user) {
            (async () => {
                await supabase.auth
                    .getUserIdentities()
                    .then(({ data, error }) => {
                        if (error) return;

                        const identityData = data.identities[0].identity_data;
                        setIdentity(identityData);
                    });
            })();
        } else {
            setOpened(true);
        }
    }, [user]);

    useEffect(() => {
        if (canvasData) setStartTime(canvasData.updated_at);
    }, [canvasData]);

    return (
        <div
            className={`fixed h-[100dvh] p-4 z-20 flex duration-300 hover:duration-200 hover:translate-x-1.5 ${
                opened ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="w-80 bg-[#17171d] p-6 border-2 border-white/25 h-full rounded-xl flex flex-col justify-between drop-shadow-2xl drop-shadow-black/25">
                <div className="grid gap-4">
                    <span className="text-3xl font-display font-bold">
                        hackaplace 🎨
                    </span>

                    <p className="text-sm opacity-75 leading-relaxed">
                        An open 1000x1000 canvas for Hack Clubbers! You can
                        place a single pixel on it every 5 minutes.
                    </p>
                </div>

                {identity ? (
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1 font-medium text-xs">
                            <div className="flex justify-between">
                                <span className="opacity-75">Cooldown</span>
                                <span className="font-mono font-bold">
                                    {cooldown === "0:00" ? (
                                        <span className="text-green-400">
                                            Ready
                                        </span>
                                    ) : (
                                        <span className="text-red-500">
                                            {cooldown}
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between opacity-75">
                                <span>Last updated by</span>
                                <span className="font-mono">
                                    {canvasData &&
                                        "..." +
                                            (
                                                canvasData.updated_by as string
                                            ).slice(-10)}
                                </span>
                            </div>
                            <div className="flex justify-between opacity-75">
                                <span>Last updated at</span>
                                <span className="font-mono">
                                    {canvasData &&
                                        timeAgo(canvasData.updated_at)}
                                </span>
                            </div>
                            <div className="flex justify-between opacity-75">
                                <span>Color</span>
                                <input
                                    className="inline-block w-12 h-6"
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.currentTarget.value)}
                                />
                            </div>
                        </div>
                        <span className="text-xs italic opacity-50 font-medium">
                            ~ {user?.email}
                        </span>
                    </div>
                ) : (
                    <div className="mt-6 flex gap-2">
                        <button
                            onClick={() =>
                                (window.location.href = "/auth/login")
                            }
                            className="text-lg px-4 py-2 rounded-md bg-green-600/75 font-semibold duration-150 hover:bg-green-600/100 border-2 cursor-pointer border-white/25 w-full"
                        >
                            sign in
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
