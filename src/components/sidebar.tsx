import useUserStore from "@/stores/user";
import supabase from "@/utils/supabase";
import { UserIdentity } from "@supabase/supabase-js";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const [opened, setOpened] = useState(false);
    const { user } = useUserStore();

    const [identity, setIdentity] = useState<
        UserIdentity["identity_data"] | null
    >(null);

    async function signIn() {
        await supabase.auth.signInWithOAuth({
            provider: "slack_oidc",
            options: {
                scopes: "openid email profile",
                redirectTo: `${window.location.origin}/callback`,
            },
        });
    }

    async function logOut() {
        await supabase.auth.signOut().then(() => window.location.reload());
    }

    useEffect(() => {
        if (!user) return;

        (async () => {
            const { data, error } = await supabase.auth.getUserIdentities();

            if (!error) {
                const identityData = data.identities[0].identity_data;
                setIdentity(identityData);
            }

            setOpened(true);
        })();
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
                {/* <button onClick={signIn}>sign in</button>
                <button onClick={logOut}>log out</button> */}

                {/* {user && <span>welcome, {user.email}</span>} */}
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
        // <div className={`fixed z-20 h-[100dvh] flex shrink-0`}>
        //     <div
        //         className={`transform transition-transform duration-300 flex ${
        //             closed ? "-translate-x-full" : "translate-x-0"
        //         }`}
        //     >
        //         <div className="p-6 h-full">
        //             <div className="w-72 bg-[#17171d] p-6 border-2 border-white/25 h-full rounded-2xl drop-shadow-2xl drop-shadow-black/25 flex flex-col justify-between">
        //                 <div className="grid gap-3">
        //                     <span className="text-3xl font-bold font-display">
        //                         Hackaplace
        //                     </span>
        //                     <span className="opacity-75 text-sm leading-relaxed">
        //                         The canvas is blank. You can place one pixel,
        //                         then wait. On your own, you can create
        //                         something. With others, you can create even
        //                         more.
        //                     </span>
        //                 </div>

        //                 <div className="flex gap-4 w-full">
        //                     <img
        //                         className="rounded-full w-12 h-12 border-2 border-white/25"
        //                         src="https://github.com/ronykax.png"
        //                         alt=""
        //                     />
        //                     <div className="flex flex-col gap-1">
        //                         <span className="font-bold text-base font-display">
        //                             Rony
        //                         </span>
        //                         <div className="flex gap-2 text-sm">
        //                             <span className="underline text-purple-300">
        //                                 Logout
        //                             </span>
        //                             <span>•</span>
        //                             <span className=" underline text-purple-300">
        //                                 Settings
        //                             </span>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     <button
        //         className={`bg-[#17171d] p-3 w-fit h-fit rounded-r-xl border-2 border-l-0 border-white/25 cursor-pointer hover:-translate-y-1 duration-75 ${
        //             closed ? "-translate-x-full" : "translate-x-0"
        //         }`}
        //         onClick={() => setClosed(!closed)}
        //     >
        //         <X />
        //     </button>
        // </div>
    );
}
