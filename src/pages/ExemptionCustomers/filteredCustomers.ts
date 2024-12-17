import { ExeCustomers } from '../../models'
import { useCustomers } from '../../hooks/useCustomers'

export function FilteredCustomers(chackedCustomers: ExeCustomers[]) {
	const { customers } = useCustomers()
	const allCustemersList = customers.map(order => {
		return order.customer
	})

	const allCustemersListFiltered = Array.from(new Set(allCustemersList))
	const addedCustemers = chackedCustomers.map(customer => {
		return customer.name
	})
	const addedCustemersSet = new Set(addedCustemers)

	const result = allCustemersListFiltered.filter(e => (e ? !addedCustemersSet.has(e) : ''))

	const options = result.map(item => {
		return {
			label: item,
			value: item,
		}
	})

	return options
}
