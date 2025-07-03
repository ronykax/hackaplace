import supabase from "./supabase";

export default async function getCanvas() {
    const { data, error } = await supabase
        .from("canvases")
        .select("*")
        .eq("id", 1)
        .single();

    if (error) {
        console.error("error getting canvas base64 from supabase: ", error);
        return null;
    } else {
        const base64 = data.canvas;
        const blob = new Blob(
            [Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))],
            {
                type: "image/png",
            }
        );

        const url = URL.createObjectURL(blob);
        return url;
    }
}
