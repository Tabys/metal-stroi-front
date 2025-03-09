import { Rates, WorkshopData, WorkshopProduct } from '../../../../models'
import { workshopProductTotalData } from './workshopProductTotalData'

type workshopOrderTotalDataProps = {
	products?: WorkshopProduct[]
	rates: Rates[]
	workshopData?: WorkshopData
}

export function workshopOrderTotalData({ products, rates, workshopData }: workshopOrderTotalDataProps) {
	let total_work = 0
	let total_installation = 0
	let total_painting = 0
	let total_polymer = 0
	let total_tmc = 0
	let total_weight = 0
	let total_metal = 0
	let total_cost = 0

	products?.forEach(product => {
		product.workshops_materials.forEach(material => {
			total_weight += Number(material.workshops_product_material.actual_quantity) * Number(material.weight)
		})
	})

	products?.forEach(product => {
		let metal = 0
		total_work += Number(product.work_time) * Number(product.work_complexity) * Number(workshopData?.tariff_welding) * Number(product.quantity)
		total_installation +=
			Number(product.installation_time) * Number(product.installation_complexity) * Number(workshopData?.tariff_installation) * Number(product.quantity)
		total_painting += Number(product.painting_time) * Number(product.painting_complexity) * Number(workshopData?.tariff_painting) * Number(product.quantity)
		total_polymer += Number(product.polymer_price) * Number(product.quantity)

		product.workshops_materials.forEach(material => {
			metal += Number(material.workshops_product_material.actual_quantity) * Number(material.price)
		})
		product.workshops_consumables.forEach(consumable => {
			total_tmc += Number(consumable.price) * Number(consumable.quantity)
		})
		total_metal += Number(metal) * Number(product.quantity)

		const total_one_product = workshopProductTotalData({ product, rates, workshopData, allMaterialWeight: total_weight })
		total_cost += total_one_product.price * Number(product.quantity)
	})

	return {
		work: total_work,
		installation: total_installation,
		painting: total_painting,
		polymer: total_polymer,
		tmc: total_tmc,
		weight: total_weight,
		metal: total_metal,
		cost: total_cost,
	}
}
