"use client";

import { useEffect, useRef, useState } from "react";
import useUserStore from "@/stores/user";
import usePlacedStore from "@/stores/placed";
import useBlobStore from "@/stores/blob";
import getCanvas from "@/utils/get-canvas";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const { user } = useUserStore();
    const { placed, setPlaced } = usePlacedStore();
    const { setBlob } = useBlobStore();

    const [latestImage, setLatestImage] = useState<string | null>(null);

    // only get the canvas image if the user is logged in
    useEffect(() => {
        if (user) {
            (async () => {
                const url = await getCanvas();
                setLatestImage(url);
            })();
        } else {
            setLatestImage("/notloggedin.png");
        }
    }, [user]);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = latestImage ?? "/space.png";
        img.onload = () => ctx.drawImage(img, 0, 0);
    }, [latestImage]);

    // remove `user` from dependency list and `if (!user) return;` if theress an error
    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        const handleClick = async (e: MouseEvent) => {
            if (!user) return;
            console.log(user.email);

            // don't work if a pixel has been already placed
            if (placed) return;

            const blob = await drawPixel({ canvas, ctx, e });
            if (!blob) return;

            setBlob(blob);
            setPlaced(true);
        };

        canvas.addEventListener("click", handleClick);
        return () => canvas.removeEventListener("click", handleClick);
    }, [user, placed]);

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
            style={{
                cursor: placed ? "not-allowed" : "crosshair",
                imageRendering: "pixelated",
            }}
        ></canvas>
    );
}
