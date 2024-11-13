import { Detail, PaintingMods } from '../../../../models'

type UpdPaintingOptionProps = {
	dataDetail: Detail
	paintingMods: PaintingMods[]
}

export function UpdPaintingOption({ dataDetail, paintingMods }: UpdPaintingOptionProps) {
	if (dataDetail.polymer_options && dataDetail.polymer_options.length) {
		let add_price_polymer = 0
		dataDetail.polymer_options.forEach(item => {
			const mod = paintingMods.find(paintingMod => paintingMod.id === Number(item))
			if (mod?.type === '%') {
				add_price_polymer += dataDetail.polymer_base_price * (Number(mod?.cost) / 100)
			} else {
				add_price_polymer += Number(mod?.cost)
			}
		})

		dataDetail.polymer_price = Number(dataDetail.polymer_base_price) + Number(add_price_polymer)
	} else {
		dataDetail.polymer_price = dataDetail.polymer_base_price
	}

	return dataDetail
}
