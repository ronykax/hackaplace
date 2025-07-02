"use client";

import Canvas from "@/components/canvas";
import CanvasWrapper from "@/components/canvas-wrapper";
import Sidebar from "@/components/sidebar";

export default function Home() {
    return (
        <div className="flex flex-col lg:flex-row h-screen w-screen">
            <Sidebar />
            <div className="flex-1 bg-[#121217]">
                <CanvasWrapper>
                    <Canvas />
                </CanvasWrapper>
            </div>
        </div>
    );
}
