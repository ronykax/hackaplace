"use client";

import supabase from "@/utils/supabase";
import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        (async () => {
            await supabase.auth.signOut();
        })();

        window.location.href = "/";
    }, []);

    return <span>logging u out...</span>;
}
