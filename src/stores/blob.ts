// keeps track of the current blob (client side)

import { create } from "zustand";

interface BlobState {
    blob: Blob | null;
    setBlob: (blob: Blob) => void;
}

const useBlobStore = create<BlobState>((set) => ({
    blob: null,
    setBlob: (blob) => set({ blob }),
}));

export default useBlobStore;