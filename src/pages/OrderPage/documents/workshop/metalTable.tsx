import { NeededMetal } from '../../../../models'

type NeededMetalProps = {
	metals: NeededMetal
}
export function MetalTable({ metals }: NeededMetalProps) {
	let material = ''
	switch (metals.material) {
		case 'St37':
			material = '(чер.)'
			break
		case '1.4301':
			material = '(нерж.)'
			break
		case 'AlMg3':
			material = '(цвет.)'
			break
	}
	return (
		<tr>
			<td>
				{metals.thickness} {material}
			</td>
			<td>{metals.width}</td>
			<td>{metals.length}</td>
			<td>{metals.metal_sheets}</td>
		</tr>
	)
}
