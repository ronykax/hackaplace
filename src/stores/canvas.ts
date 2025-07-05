import { create } from "zustand";

interface CanvasDataState {
    canvasData: any;
    setCanvasData: (canvasData: object) => void;
}

const useCanvasDataStore = create<CanvasDataState>((set) => ({
    canvasData: null,
    setCanvasData(canvasData) {
        set({ canvasData });
    },
}));

export default useCanvasDataStore;