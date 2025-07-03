"use client";

import { useEffect, useRef, useState } from "react";
import supabase from "@/utils/supabase";
import blobToBase64 from "@/utils/blob-to-base64";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [latestImage, setLatestImage] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from("canvases")
                .select("*")
                .eq("id", 1)
                .single();

            if (error) return console.error(error);

            const base64 = data.canvas;
            const blob = new Blob(
                [Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))],
                {
                    type: "image/png",
                }
            );

            const url = URL.createObjectURL(blob);
            setLatestImage(url);
        })();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.style.width = "100%";
        canvas.style.imageRendering = "pixelated";

        const img = new Image();

        img.crossOrigin = "anonymous";
        img.src = latestImage ? latestImage : "/space.png";
        img.onload = () => ctx.drawImage(img, 0, 0);

        const handleClick = async (e: MouseEvent) => {
            const blob = await drawPixel({ canvas, ctx, e });
            if (!blob) return;

            // const buffer = await blob.arrayBuffer();
            const base64 = await blobToBase64(blob);

            const { error } = await supabase
                .from("canvases")
                .update({ canvas: base64 })
                .eq("id", 1);

            if (error) console.error("update failed: ", error);
        };

        canvas.addEventListener("click", handleClick);
        return () => canvas.removeEventListener("click", handleClick);
    }, [latestImage]);

    function drawPixel({
        canvas,
        ctx,
        e,
    }: {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        e: MouseEvent;
    }): Promise<Blob | null> {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = Math.floor((e.clientX - rect.left) * scaleX);
        const y = Math.floor((e.clientY - rect.top) * scaleY);

        ctx.fillStyle = "#000000";
        ctx.fillRect(x, y, 1, 1);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => resolve(blob), "image/png");
        });
    }

    return (
        <canvas
            ref={canvasRef}
            width={128}
            height={128}
            className="cursor-crosshair"
        ></canvas>
    );
}
