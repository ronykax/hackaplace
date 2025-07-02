import useColorStore from "@/stores/color";

export default function ColorPicker() {
    const color = useColorStore();

    return (
        <div>
            <input
                type="color"
                value={color.color}
                onChange={(e) => color.setColor(e.target.value)}
            />
        </div>
    );
}

// import useColorStore from "@/stores/color";
// import { HexColorPicker } from "react-colorful";

// export default function CP() {
//     const color = useColorStore();

//     return (
//         <div className="p-2 bg-white/5 w-fit h-fit rounded-xl">
//             <HexColorPicker onChange={(c) => color.setColor(c)} />
//         </div>
//     );
// }
