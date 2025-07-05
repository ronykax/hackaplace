"use client";

import { useEffect, useRef, useState } from "react";
import useUserStore from "@/stores/user";
import usePlacedStore from "@/stores/placed";
import useBlobStore from "@/stores/blob";
import getCanvas from "@/utils/get-canvas";
import useCanvasDataStore from "@/stores/canvas";
import base64ToURL from "@/utils/base64-to-url";
import { useCooldownStore } from "@/stores/cooldown";
import useColorStore from "@/stores/color";

export default function Canvas() {
    const size = 1000;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const { user } = useUserStore();
    const { placed, setPlaced } = usePlacedStore();
    const { setBlob } = useBlobStore();
    const { canvasData, setCanvasData } = useCanvasDataStore();
    const { cooldown } = useCooldownStore();
    const { color } = useColorStore();

    const [latestImage, setLatestImage] = useState<string | null>(null);

    const [uCantDrawLilBro, setUCantDrawLilBro] = useState(true);

    // only get the canvas image if the user is logged in
    useEffect(() => {
        if (user) {
            (async () => {
                await getCanvas().then((data) => {
                    setCanvasData(data);
                    setLatestImage(base64ToURL(data.canvas));
                });
            })();
        }
    }, [user]); // !!! add user

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingEnabled = false;

        if (latestImage) {
            const img = new Image();

            img.crossOrigin = "anonymous";
            img.src = latestImage;

            img.onload = () => ctx.drawImage(img, 0, 0);
        }
    }, [latestImage]); // !!! add latestImage

    // remove `user` from dependency list and `if (!user) return;` if theress an error
    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        if (!user) {
            setUCantDrawLilBro(true);
            return;
        }

        if (cooldown !== "0:00") {
            setUCantDrawLilBro(true);
            return;
        }

        if (placed) {
            setUCantDrawLilBro(true);
            return;
        }

        setUCantDrawLilBro(false);

        const handleClick = async (e: MouseEvent) => {
            const blob = await drawPixel({ canvas, ctx, e });
            if (!blob) return;

            setBlob(blob);
            setPlaced(true);
        };

        canvas.addEventListener("click", handleClick);
        return () => canvas.removeEventListener("click", handleClick);
    }, [user, placed, cooldown, color]);

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

        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => resolve(blob), "image/png");
        });
    }

    return (
        <canvas
            ref={canvasRef}
            width={size}
            height={size}
            className="cursor-crosshair"
            style={{
                cursor: uCantDrawLilBro ? "not-allowed" : "crosshair",
                imageRendering: "pixelated",
                backgroundImage: 'url("/space1000x1000.png")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        ></canvas>
    );
}
