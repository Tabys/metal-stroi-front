import { Metal } from '../../../../../models'
import { getMetalNameSuffix } from '../../metalList/getMetalNameSuffix'

type NeededMetalProps = {
	metals: Metal
}
export function MetalTable({ metals }: NeededMetalProps) {
	const metalName = getMetalNameSuffix(metals.material)
	return (
		<tr>
			<td>
				{metals.thickness_title} {metalName} {metals.customer_metal ? 'зак' : ''}
			</td>
			<td>{metals.width}</td>
			<td>{metals.length}</td>
			<td>{Number(metals.metal_sheets).toFixed(3)}</td>
		</tr>
	)
}
