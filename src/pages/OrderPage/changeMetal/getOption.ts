import { MetalType, PriceMetalItems, Setup } from '../../../models'
type Option = {
	value: string[] | undefined
	text: string[] | undefined
}
type getOptionProps = {
	metals: MetalType[] | null
	setup: Setup
}

export function getOption({ metals, setup }: getOptionProps) {
	let listMetal: Option = {
		value: [],
		text: [],
	}

	metals?.forEach(metal => {
		let test = metal.price_metal_items?.filter(item => {
			const thickness = setup.work_piece?.split('x')[2]
			return Number(item.thickness) === Number(thickness)
		})

		if (test?.length) {
			listMetal.value?.push(String(metal.abbreviation))
			listMetal.text?.push(String(metal.name))
		}
	})

	return listMetal
}
