import Decimal from 'decimal.js'
import { Order, WorkshopMaterialType } from '../../../../models'
import { autoRound } from '../../../../hooks/useDecimal'

export function crateMaterialGroupList(dataOrder?: Order) {
	const arrMaterials: WorkshopMaterialType[] = []
	const groupedMaterialsMap = new Map<number, WorkshopMaterialType>()

	dataOrder?.workshops_products?.forEach(product => {
		product.workshops_materials.forEach(material => {
			const quantity = autoRound(new Decimal(Number(material.workshops_product_material.actual_quantity)).mul(Number(product.quantity)))
			material.quantity = quantity.toNumber()
			arrMaterials.push(material)
		})
	})

	arrMaterials.forEach(material => {
		if (!groupedMaterialsMap.has(material.id)) {
			groupedMaterialsMap.set(material.id, { ...material })
		} else {
			const existingMaterial = groupedMaterialsMap.get(material.id)!
			const oldQuantity = new Decimal(existingMaterial.quantity)
			const newQuantity = new Decimal(material.quantity)
			existingMaterial.quantity = autoRound(oldQuantity.add(newQuantity)).toNumber()
		}
	})

	const groupedMaterials = Array.from(groupedMaterialsMap.values())
	groupedMaterials.sort((a, b) => a.name.localeCompare(b.name))

	return groupedMaterials
}
