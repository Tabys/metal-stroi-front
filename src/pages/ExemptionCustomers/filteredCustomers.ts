import { ExeCustomers } from '../../models'
import { useOrders } from '../../hooks/orders'

export function FilteredCustomers(customers: ExeCustomers[]) {
	const { orders } = useOrders()
	const allCustemersList = orders.map(order => {
		return order.customer
	})
	const allCustemersListFiltered = Array.from(new Set(allCustemersList))
	const addedCustemers = customers.map(customer => {
		return customer.name
	})
	const addedCustemersSet = new Set(addedCustemers)

	const result = allCustemersListFiltered.filter(e =>
		e ? !addedCustemersSet.has(e) : ''
	)

	const options = result.map(item => {
		return {
			label: item,
			value: item,
		}
	})

	return options
}
