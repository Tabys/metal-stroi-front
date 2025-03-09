import Decimal from 'decimal.js'
import { Rates, WorkshopData, WorkshopProduct } from '../../../../models'

type workshopProductTotalDataProps = {
	product: WorkshopProduct
	rates: Rates[]
	workshopData?: WorkshopData
	allMaterialWeight: number
}

export function workshopProductTotalData({ product, workshopData, allMaterialWeight }: workshopProductTotalDataProps) {
	const payment_form = new Decimal(Number(workshopData?.rate)).div(100).add(1)

	const total_work = new Decimal(Number(product.work_time)).mul(Number(product.work_complexity)).mul(Number(workshopData?.tariff_welding))
	const total_installation = new Decimal(Number(workshopData?.tariff_installation))
		.mul(Number(product.installation_time))
		.mul(Number(product.installation_complexity))
	const total_painting = new Decimal(Number(product.painting_time)).mul(Number(product.painting_complexity)).mul(Number(workshopData?.tariff_painting))

	let material_price = 0
	let material_weight = 0
	product.workshops_materials.forEach(material => {
		const price = new Decimal(Number(material.workshops_product_material.actual_quantity)).mul(Number(material.workshops_product_material.price))
		material_price += price.toNumber()
		const weight = new Decimal(Number(material.workshops_product_material.actual_quantity)).mul(Number(material.weight))
		material_weight += weight.toNumber()
	})

	let consumables_price = 0
	product.workshops_consumables.forEach(consumable => {
		consumables_price += Number(consumable.price) * Number(consumable.quantity)
	})

	const percent = new Decimal(material_weight).div(new Decimal(allMaterialWeight).div(100)).div(100)
	const additionalPrices = new Decimal(workshopData?.outsourcing || 1)
		.add(workshopData?.delivery || 1)
		.add(workshopData?.business_trip || 1)
		.mul(percent)
		.div(product.quantity || 1)

	const total_price =
		(total_work.toNumber() +
			total_installation.toNumber() +
			total_painting.toNumber() +
			Number(product.polymer_price) +
			Number(material_price) +
			additionalPrices.toNumber() +
			Number(consumables_price)) *
		payment_form.toNumber() *
		(Number(workshopData?.profit) / 100 + 1)

	return {
		work: total_work.toNumber(),
		installation: total_installation.toNumber(),
		painting: total_painting.toNumber(),
		price: Math.ceil(total_price),
	}
}
