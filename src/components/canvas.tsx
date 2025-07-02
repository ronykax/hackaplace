"use client";
import useColorStore from "@/stores/color";
import { useEffect, useRef } from "react";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const color = useColorStore();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.style.width = "100%";
        canvas.style.imageRendering = "pixelated";

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const x = Math.floor((e.clientX - rect.left) * scaleX);
            const y = Math.floor((e.clientY - rect.top) * scaleY);

            ctx.fillStyle = color.color;
            ctx.fillRect(x, y, 1, 1);
        };

        canvas.addEventListener("click", handleClick);
        return () => canvas.removeEventListener("click", handleClick);
    }, [color.color]);

    return (
        <canvas
            ref={canvasRef}
            width={128}
            height={128}
        ></canvas>
    );
}
