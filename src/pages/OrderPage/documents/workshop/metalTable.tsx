import { WorkshopMetal } from '../../../../models'
import { getMetalNameSuffix } from '../../metalList/getMetalNameSuffix'

type NeededMetalProps = {
	metals: WorkshopMetal
}
export function MetalTable({ metals }: NeededMetalProps) {
	const material = getMetalNameSuffix(metals.material ? metals.material : '')
	return (
		<tr>
			<td>
				{metals.thickness_title} {material} {metals.suffixes} {metals.customers_metal ? 'зак' : ''}
			</td>
			<td>{metals.width}</td>
			<td>{metals.length}</td>
			<td>{Number(metals.metal_sheets).toFixed(3)}</td>
		</tr>
	)
}
