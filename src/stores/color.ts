import { create } from "zustand";

interface ColorState {
    color: string;
    setColor: (color: string) => void;
}

const useColorStore = create<ColorState>((set) => ({
    color: "#000000",
    setColor: (color) => set({ color: color }),
}));

export default useColorStore;
