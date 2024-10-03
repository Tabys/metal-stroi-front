import { Detail } from '../../../../models'

export function UpdPaintingOption(dataDetail: Detail) {
	if (dataDetail.polymer_options && dataDetail.polymer_options.length) {
		let add_price_polymer = 0
		dataDetail.polymer_options.forEach(item => {
			switch (JSON.stringify(item)) {
				case JSON.stringify('shagreen'):
					add_price_polymer += 60
					break
				case JSON.stringify('matte'):
					add_price_polymer += dataDetail.polymer_base_price * 0.2
					break
				case JSON.stringify('lacquer'):
					add_price_polymer += dataDetail.polymer_base_price * 0.7
					break
				case JSON.stringify('big'):
					add_price_polymer += dataDetail.polymer_base_price * 0.2
					break
			}
		})

		dataDetail.polymer_price =
			Number(dataDetail.polymer_base_price) + Number(add_price_polymer)
	} else {
		dataDetail.polymer_price = dataDetail.polymer_base_price
	}

	return dataDetail
}
