export default function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onerror = () =>
            reject(new Error("Failed to read blob as Base64"));
        reader.onloadend = () => {
            const result = reader.result;
            if (typeof result !== "string") {
                return reject(new Error("Expected result to be a string"));
            }

            const base64 = result.split(",")[1];
            if (!base64) {
                return reject(new Error("Invalid base64 string"));
            }

            resolve(base64);
        };

        reader.readAsDataURL(blob);
    });
}
