import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export default function CanvasWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [panning, setPanning] = useState(false);

    return (
        <div className="w-screen h-screen">
            <TransformWrapper
                initialScale={10}
                minScale={0.75}
                maxScale={60}
                doubleClick={{ disabled: true }}
                centerZoomedOut={false}
                centerOnInit={true}
                onPanning={() => setPanning(true)}
                onPanningStop={() => setPanning(false)}
                limitToBounds={false}
                panning={{ velocityDisabled: true }}
                wheel={{ smoothStep: 0.0035 }}
                disablePadding={true}
                smooth={true}
            >
                <TransformComponent
                    contentStyle={{
                        // add shadow
                        width: "1000px",
                        height: "1000px",
                    }}
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
        </div>
    );
}
