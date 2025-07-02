"use client";
import useColorStore from "@/stores/color";
import { useEffect, useRef } from "react";
import supabase from "@/lib/supabase";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const color = useColorStore();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        canvas.style.width = "100%";
        canvas.style.imageRendering = "pixelated";

        // clear canvas
        // ctx.fillStyle = "white";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        img.src = "/space.png";
        img.onload = () => ctx.drawImage(img, 0, 0);

        const handleClick = async (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const x = Math.floor((e.clientX - rect.left) * scaleX);
            const y = Math.floor((e.clientY - rect.top) * scaleY);

            ctx.fillStyle = color.color;
            ctx.fillRect(x, y, 1, 1);

            const fileBody = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            ).data;

            const { data, error } = await supabase.storage
                .from("canvases")
                .upload("./canvas.png", fileBody);

            console.log("data: ", error);
        };

        canvas.addEventListener("click", handleClick);
        return () => canvas.removeEventListener("click", handleClick);
    }, [color.color]);

    return (
        <canvas
            ref={canvasRef}
            width={128}
            height={128}
            className="cursor-crosshair"
        ></canvas>
    );
}
