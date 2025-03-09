import { Order, WorkshopConsumablesType } from '../../../../models'

export function crateConsumablesGroupList(dataOrder?: Order) {
	const arrConsumables: WorkshopConsumablesType[] = []
	const groupedConsumables: WorkshopConsumablesType[] = []
	dataOrder?.workshops_products?.forEach(product => {
		product.workshops_consumables.forEach((consumable, index) => {
			consumable.quantity = Number(consumable.quantity)
			arrConsumables.push(consumable)
		})
	})

	for (let i = 0; i < arrConsumables.length; i++) {
		const index = groupedConsumables.findIndex(el => el.name === arrConsumables[i].name)
		if (index === -1) {
			groupedConsumables.push({ ...arrConsumables[i] })
		} else {
			groupedConsumables[index].quantity += Number(arrConsumables[i].quantity)
		}
	}

	groupedConsumables.sort((a, b) => a.name.localeCompare(b.name))

	return groupedConsumables
}
