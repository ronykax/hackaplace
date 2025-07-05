// updates the canvas in supabase

import { User } from "@supabase/supabase-js";
import blobToBase64 from "./blob-to-base64";
import supabase from "./supabase";

export default async function updateCanvas({
    blob,
    user,
}: {
    blob: Blob;
    user: User;
}) {
    const base64 = await blobToBase64(blob);

    const { error } = await supabase
        .from("canvases")
        .update({
            canvas: base64,
            updated_by: user.id,
            updated_at: new Date().toISOString(),
        })
        .eq("id", 1);

    if (error) {
        console.error("update failed: ", error);
    } else {
        console.log("update succesful!");
        window.location.reload();
    }
}
