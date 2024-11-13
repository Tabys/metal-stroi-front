import { DocTableDetail, PaintingMods } from '../../../../models'
import styles from '../style.module.css'

type PaintingTableProps = {
	detail: DocTableDetail
	index: number
	paintingMods: PaintingMods[]
}

export function PaintingTable({ detail, index, paintingMods }: PaintingTableProps) {
	const volume = (Number(detail.surface) / 1000000) * 2
	let polymerOptions = ''
	detail?.polymer_options?.forEach(option => {
		const paintingMod = paintingMods.find(mod => mod.id === Number(option))
		polymerOptions += paintingMod?.name + ' '
	})

	return (
		<tr>
			<td className={styles.center}>{index + 1}</td>
			<td className={styles.left}>{detail.name}</td>
			<td className={styles.center}>{detail.quantity}</td>
			<td>
				{detail.polymer} {polymerOptions}
			</td>
			<td>{volume.toFixed(3)}</td>
			<td>{Number(detail.painting).toFixed(3)}</td>
		</tr>
	)
}
