import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export default function CanvasWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [panning, setPanning] = useState(false);

    return (
        <TransformWrapper
            initialScale={6}
            minScale={1}
            maxScale={10}
            doubleClick={{ disabled: true }}
            centerZoomedOut={false}
            centerOnInit={true}
            onPanning={() => setPanning(true)}
            onPanningStop={() => setPanning(false)}
            limitToBounds={false}
            panning={{ velocityDisabled: true }}
        >
            <TransformComponent
                wrapperStyle={{
                    width: "100%",
                    height: "100%",
                    pointerEvents: panning ? "none" : "auto", // don't draw when panning
                    backgroundImage:
                        "radial-gradient(rgba(255, 255, 255, 0.1) 2px, transparent 0)",
                    backgroundSize: "24px 24px",
                }}
            >
                {children}
            </TransformComponent>
        </TransformWrapper>
    );
}
