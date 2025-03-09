import { PaintingMods, WorkshopProduct } from '../../../../../models'
import styles from '../style.module.css'

type PaintingTableWorkshopsProps = {
	product: WorkshopProduct
	index: number
	paintingMods: PaintingMods[]
}

export function PaintingTableWorkshops({ product, index, paintingMods }: PaintingTableWorkshopsProps) {
	let polymerOptions = ''
	product?.polymer_options?.forEach(option => {
		const paintingMod = paintingMods.find(mod => mod.id === Number(option))
		polymerOptions += paintingMod?.name + ' '
	})

	return (
		<tr>
			<td className={styles.center}>{index + 1}</td>
			<td className={styles.left}>{product.name}</td>
			<td className={styles.center}>{product.quantity}</td>
			<td>
				{product.polymer_color} {polymerOptions}
			</td>
			<td>{(Number(product.polymer_price) * Number(product.quantity)).toFixed(3)}</td>
		</tr>
	)
}
