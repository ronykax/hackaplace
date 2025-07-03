export default function byteaToUint8Array(byteaStr: string) {
    // Remove the \x prefix
    const hex = byteaStr.slice(2);
    const bytes = new Uint8Array(hex.length / 2);

    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }

    return bytes;
}
