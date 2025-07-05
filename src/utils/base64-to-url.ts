export default function base64ToURL(base64: string) {
    const blob = new Blob(
        [Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))],
        {
            type: "image/png",
        }
    );

    const url = URL.createObjectURL(blob);
    return url;
}
