import useUserStore from "@/stores/user";
import supabase from "@/utils/supabase";
import { UserIdentity } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const [opened, setOpened] = useState(false);
    const { user } = useUserStore();

    const [identity, setIdentity] = useState<
        UserIdentity["identity_data"] | null
    >(null);

    useEffect(() => {
        if (user) {
            (async () => {
                const { data, error } = await supabase.auth.getUserIdentities();

                if (!error) {
                    const identityData = data.identities[0].identity_data;
                    setIdentity(identityData);
                }
            })();
        }

        setOpened(true);
    }, [user]);

    return (
        <div
            className={`fixed h-[100dvh] p-4 shrink-0 z-20 flex duration-300 hover:duration-200 hover:translate-x-1.5 ${
                opened ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="w-72 bg-[#17171d] p-6 border-2 border-white/25 h-full rounded-xl flex flex-col justify-between">
                <div className="grid gap-3">
                    <span className="text-3xl font-display font-bold">
                        hackaplace
                    </span>

                    <span className="text-sm opacity-75 leading-relaxed">
                        The canvas is empty and every hackclubber gets to draw
                        one pixel every 5-10 minutes!
                    </span>
                </div>

                {identity && (
                    <div className="flex gap-3 items-centers">
                        <img
                            className="rounded-full w-10 h-10"
                            src={identity.picture}
                        />

                        <div className="flex flex-col gap-0">
                            <span className="font-semibold">
                                {identity.full_name}
                            </span>
                            <span className="opacity-75 text-sm">
                                {identity.email}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
