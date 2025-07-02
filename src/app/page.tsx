"use client";

import Canvas from "@/components/canvas";
import CanvasWrapper from "@/components/canvas-wrapper";
import Sidebar from "@/components/sidebar";
import useUserStore from "@/stores/user";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function Home() {
    const { setUser } = useUserStore();

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase.auth.getUser();
            if (!error) setUser(data.user);
        })();
    }, []);

    return (
        <div className="flex flex-col lg:flex-row h-screen w-screen font-body">
            <Sidebar />
            <div className="flex-1 bg-[#121217]">
                <CanvasWrapper>
                    <Canvas />
                </CanvasWrapper>
            </div>

            <span className="text-sm fixed bottom-6 left-1/2 text-center font-medium opacity-50 -translate-x-1/2">
                Scroll to zoom in and out. Click to pan around.
            </span>
        </div>
    );
}
