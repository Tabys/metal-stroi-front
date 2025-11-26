import { Metal, MetalType } from '../../../../../models'

type NeededMetalProps = {
	metals: Metal
	metalPrices: MetalType[]
}
export function MetalTable({ metals, metalPrices }: NeededMetalProps) {
	const metalName = metalPrices.find(metalType => metalType.abbreviation === metals.material)?.short_name_for_metal || metals.material
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
