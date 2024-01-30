import { NeededMetal } from "../../../../models";

type NeededMetalProps = {
    metals: NeededMetal
}
export function MetalTable({ metals }: NeededMetalProps) {

    return (
        <tr>
            <td>{metals.thickness}</td>
            <td>{metals.width}</td>
            <td>{metals.length}</td>
            <td>{(metals.metal_sheets).toFixed(3)}</td>
        </tr>
    )
}