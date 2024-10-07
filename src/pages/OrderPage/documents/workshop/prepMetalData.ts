import { Material, Setup } from '../../../../models'

type prepMetalDataProps = {
	setups: Setup[] | undefined
	materials: Material[]
}

function round50(number: number) {
	return Math.ceil(number / 50) * 50
}

export function prepMetalData({ setups, materials }: prepMetalDataProps) {
	const metalData = setups?.map(setup => {
		const full_metal_length = setup.work_piece?.split(' x ')[0]
		let full_metal_width = setup.work_piece?.split(' x ')[1]

		let min_metal_length = setup.min_work_piece?.split(' x ')[0]
		let min_metal_width = setup.min_work_piece?.split(' x ')[1]

		const rounded_used_metal_lengh = round50(Number(min_metal_length))
		let rounded_used_metal_width = round50(Number(min_metal_width))

		let used_metal_length = 0
		let used_metal_width = 0

		if (Number(full_metal_length) - rounded_used_metal_lengh < 350) {
			used_metal_length = Number(full_metal_length)
		} else {
			used_metal_length = rounded_used_metal_lengh
		}

		if (Number(full_metal_width) - rounded_used_metal_width < 350) {
			used_metal_width = Number(full_metal_width)
		} else {
			used_metal_width = rounded_used_metal_width
		}

		const used_metal = ((used_metal_length * used_metal_width) / (Number(full_metal_length) * Number(full_metal_width))) * Number(setup.program_runs)

		const thickness = materials.find(items => {
			return String(items.table_name) === String(setup.table_number)
		})

		let suffixes: string[] = []

		setup.suffixes?.forEach(suffix => {
			const stringSuffix = JSON.stringify(suffix)
			const objectSuffix = JSON.parse(stringSuffix)
			suffixes.push(objectSuffix.value)
			suffixes.sort((a, b) => a.localeCompare(b))
		})
		const strSuffixes = suffixes.join(', ')
		return {
			material: setup?.material,
			table_number: setup.table_number,
			thickness: thickness?.thickness ? thickness.thickness : 0,
			metal_sheets: used_metal,
			length: used_metal_length,
			width: used_metal_width,
			suffixes: strSuffixes,
			thickness_title: thickness?.title,
			customers_metal: setup.customers_metal,
		}
	})

	const groupedNeededMetal = []
	if (metalData) {
		for (let i = 0; i < metalData.length; i++) {
			const index = groupedNeededMetal.findIndex(
				el =>
					el.table_number === metalData[i].table_number &&
					el.length === metalData[i].length &&
					el.width === metalData[i].width &&
					el.suffixes === metalData[i].suffixes
			)
			if (index === -1) {
				groupedNeededMetal.push({ ...metalData[i] })
			} else {
				groupedNeededMetal[index].metal_sheets += metalData[i].metal_sheets
			}
		}
	}

	groupedNeededMetal.sort((a, b) => {
		return a.thickness - b.thickness || a.width - b.width || a.length - b.length
	})
	return groupedNeededMetal
}
