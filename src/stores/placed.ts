// true if a pixel has been placed by the user, false if not.
import { create } from "zustand";

interface PlacedState {
    placed: boolean;
    setPlaced: (placed: boolean) => void;
}

const usePlacedStore = create<PlacedState>((set) => ({
    placed: false,
    setPlaced: (placed) => {
        console.log("placed has been set to: ", placed);
        set({ placed });
    },
}));

export default usePlacedStore;
