import Decimal from 'decimal.js'
import { WorkshopData, WorkshopProduct } from '../../../../models'

type workshopProductTotalDataProps = {
	product: WorkshopProduct
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
		const weight = new Decimal(Number(material.workshops_product_material.actual_quantity)).mul(Number(material.weight)).mul(product.quantity)
		material_weight += weight.toNumber()
	})

	let consumables_cost = 0
	product.workshops_consumables.forEach(consumable => {
		consumables_cost += Number(consumable.price) * Number(consumable.quantity)
	})
	const consumables_price = new Decimal(consumables_cost).div(product.quantity)

	const percent = new Decimal(material_weight).div(new Decimal(allMaterialWeight).div(100)).div(100)
	const additionalPrices = new Decimal(workshopData?.outsourcing || 1)
		.add(workshopData?.delivery || 1)
		.add(workshopData?.business_trip || 1)
		.mul(percent)
		.div(product.quantity || 1)

	const total_cost = new Decimal(total_work)
		.mul(material_price === 0 ? new Decimal(workshopData?.consumables || 0).div(100).add(1) : 1)
		.add(total_installation)
		.add(total_painting)
		.add(product.polymer_price || 0)
		.add(material_price === 0 ? 0 : new Decimal(material_price).mul(new Decimal(workshopData?.consumables || 0).div(100).add(1)))
		.add(additionalPrices)
		.add(consumables_price)
		.mul(payment_form)
		.mul(new Decimal(workshopData?.profit || 0).div(100).add(1))
		.add(product.other_workshops || 0)
		.toDecimalPlaces(3)
		.toNumber()

	const profit = new Decimal(total_work)
		.mul(material_price === 0 ? new Decimal(workshopData?.consumables || 0).div(100).add(1) : 1)
		.add(total_installation)
		.add(total_painting)
		.add(product.polymer_price || 0)
		.add(material_price === 0 ? 0 : new Decimal(material_price).mul(new Decimal(workshopData?.consumables || 0).div(100).add(1)))
		.add(additionalPrices)
		.add(consumables_price)
		.mul(new Decimal(workshopData?.profit || 0).div(100))
		.toDecimalPlaces(3)
		.toNumber()

	const consumables = new Decimal(
		material_price === 0
			? new Decimal(total_work).mul(new Decimal(workshopData?.consumables || 0).div(100)).toNumber()
			: new Decimal(material_price).mul(new Decimal(workshopData?.consumables || 0).div(100)).toNumber()
	)

	return {
		work: total_work.toNumber(),
		installation: total_installation.toNumber(),
		painting: total_painting.toNumber(),
		price: Math.ceil(total_cost),
		profit: Math.ceil(profit),
		consumables: consumables.toNumber(),
	}
}
