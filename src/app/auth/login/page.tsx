"use client";

import supabase from "@/utils/supabase";
import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        (async () => {
            await supabase.auth.signInWithOAuth({
                provider: "slack_oidc",
                options: {
                    scopes: "openid email profile",
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
        })();
    }, []);

    return <span>signing u in...</span>;
}
