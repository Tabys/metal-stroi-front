import { DocTableProduct, PaintingMods } from '../../../../../models'
import styles from '../style.module.css'

type PaintingTableProductsProps = {
	product: DocTableProduct
	index: number
	startIndex: number
	paintingMods: PaintingMods[]
}

export function PaintingTableProducts({ product, index, startIndex, paintingMods }: PaintingTableProductsProps) {
	let polymerOptions = ''
	product?.painting_options?.forEach(option => {
		const paintingMod = paintingMods.find(mod => mod.id === Number(option))
		polymerOptions += paintingMod?.name + ' '
	})

	return (
		<tr className={index === 0 ? 'borderBold' : ''}>
			<td className={styles.center}>{startIndex + index + 1}</td>
			<td className={styles.left}>{product.name}</td>
			<td className={styles.center}>{product.quantity}</td>
			<td>
				{product.painting_color} {polymerOptions}
			</td>
			<td>{Number(product.value).toFixed(3)}</td>
			<td>{(Number(product.painting_one_element_price) * Number(product.quantity)).toFixed(3)}</td>
		</tr>
	)
}
