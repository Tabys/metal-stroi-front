import { MetalType, Setup } from '../../../../models'

type getOptionsMetalsProps = {
	metals: MetalType[] | null
	setup: Setup | undefined
}
type Option = {
	value: string | undefined
	label: string | undefined
}

export function getOptionsMetals({ metals, setup }: getOptionsMetalsProps) {
	const listMetal: Option[] = []

	metals?.forEach(metal => {
		let availebleMetals = metal.price_metal_items?.filter(item => {
			const thickness = setup?.real_thickness
			return Number(item.thickness) === Number(thickness)
		})

		if (availebleMetals?.length) {
			listMetal.push({
				value: metal.abbreviation,
				label: metal.name,
			})
		}
	})

	return listMetal
}
