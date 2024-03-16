import { Metal } from '../../../../models'

type NeededMetalProps = {
	metals: Metal
}
export function MetalTable({ metals }: NeededMetalProps) {
	return (
		<tr>
			<td>{metals.thickness}</td>
			<td>{metals.width}</td>
			<td>{metals.length}</td>
			<td>{Number(metals.metal_sheets).toFixed(3)}</td>
		</tr>
	)
}
