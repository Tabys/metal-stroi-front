import { DocTableDetail, PaintingMods } from '../../../../../models'
import styles from '../style.module.css'

type PaintingTableProps = {
	detail: DocTableDetail
	index: number
	paintingMods: PaintingMods[]
}

export function PaintingTable({ detail, index, paintingMods }: PaintingTableProps) {
	const volume = (Number(detail.surface) / 1000000) * 2

	let regularOptions: string[] = []
	let singleSideOption: string | null = null

	detail?.polymer_options?.forEach(option => {
		const paintingMod = paintingMods.find(mod => mod.id === Number(option))
		if (paintingMod?.name === 'С одной стороны') {
			singleSideOption = paintingMod.name
		} else if (paintingMod?.name) {
			regularOptions.push(paintingMod.name)
		}
	})

	return (
		<tr>
			<td className={styles.center}>{index + 1}</td>
			<td className={styles.left + ' ' + (detail.free ? styles.free : '')}>
				{detail.name} {detail.free ? ' (OZON)' : ''}
			</td>
			<td className={styles.center}>{detail.quantity}</td>
			<td>
				{detail.polymer} {regularOptions.join(' ')}
				{regularOptions.length > 0 && ' '}
				{singleSideOption && <strong>{singleSideOption}</strong>}
			</td>
			<td>{volume.toFixed(3)}</td>
			<td>{(Number(detail.painting) * Number(detail.quantity)).toFixed(3)}</td>
		</tr>
	)
}
