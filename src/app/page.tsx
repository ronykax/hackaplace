"use client";

import Canvas from "@/components/canvas";
import CP from "@/components/cp";

export default function Home() {
    return (
        <div className="flex flex-col">
            <Canvas />
            <CP />
        </div>
    );
}
