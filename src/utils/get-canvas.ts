import supabase from "./supabase";

export default async function getCanvas() {
    const { data, error } = await supabase
        .from("canvases")
        .select("*")
        .eq("id", 1)
        .single();

    if (!error) {
        return data;
    } else {
        console.error("coudln't get canvas from supabase: ", error);
        return null;
    }
}
