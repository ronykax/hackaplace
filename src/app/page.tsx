"use client";

import Canvas from "@/components/canvas";
import CanvasWrapper from "@/components/canvas-wrapper";
import Helper from "@/components/helper";
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
        <>
            <div className="flex flex-col lg:flex-row h-screen w-screen font-body">
                <Sidebar />
                <div className="flex-1 bg-[#121217]">
                    <CanvasWrapper>
                        <Canvas />
                    </CanvasWrapper>
                </div>

                <span className="text-sm fixed bottom-6 left-1/2 text-center font-medium opacity-50 -translate-x-1/2">
                    scroll to zoom and click or pinch to pan
                </span>
            </div>
            <Helper />
        </>
    );
}
