import { create } from "zustand";

interface ColorState {
    color: string;
    setColor: (color: string) => void;
}

const getInitialColor = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("color") || "#000000";
    }
    return "#000000";
};

const useColorStore = create<ColorState>((set) => ({
    color: getInitialColor(),
    setColor: (color: string) => {
        localStorage.setItem("color", color);
        set({ color });
    },
}));

export default useColorStore;
