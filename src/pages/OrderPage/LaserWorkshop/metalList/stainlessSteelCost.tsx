import { Metal, Material, WorkPiece } from '../../../../models'
import { extraPrice } from '../detailList/updPrices/extraPriceMetal'

type StainlessSteelCostProps = {
	metals: Metal[]
	markup: number
	materials: Material[]
	workPiece: WorkPiece[]
}
export function StainlessSteelCost({ metals, markup, materials, workPiece }: StainlessSteelCostProps) {
	const stainlessSteelMetals = metals.filter(
		metal =>
			metal.material === '1.4301' ||
			metal.material === 'aisi304_BA' ||
			metal.material === 'aisi304_4N' ||
			metal.material === 'aisi430_2B' ||
			metal.material === 'aisi430_BA' ||
			metal.material === 'aisi430_4N'
	)
	console.log(stainlessSteelMetals)
	const cost = stainlessSteelMetals.reduce((acc, metal) => {
		const rate = workPiece.find(
			item =>
				item.material === metal.material &&
				Number(metal.thickness) >= Number(item.thickness_min) &&
				Number(metal.thickness) <= Number(item.thickness_max)
		)

		const material = materials.find(mat => mat.table_name === metal.table_number)
		const materialCost = material ? Number(material.cost) : 0

		const markupMultiplier = 1 + Number(markup) / 100
		const sheetCount = Number(metal.metal_sheets) || 0
		const surface = rate && rate.surface ? Number(rate.surface) : 1

		let metalCost = 0
		if (!metal.customer_metal) {
			metalCost = ((materialCost * (metal.setup_width * metal.setup_length)) / surface) * markupMultiplier + extraPrice(markup)
			metalCost *= sheetCount
		}

		return acc + metalCost
	}, 0)

	return (
		<>
			{Number(cost) > 0 ? (
				<p>
					<strong>Стоимость нержавеющей стали:</strong> {cost.toFixed(2)}
				</p>
			) : (
				''
			)}
		</>
	)
}
