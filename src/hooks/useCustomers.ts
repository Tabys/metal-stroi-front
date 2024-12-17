import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Customers } from '../models'
import apiClient from '../components/apiClient'

export function useCustomers() {
	const [customers, setCustomers] = useState<Customers[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function fetchPrices() {
		try {
			setError('')
			setLoading(true)
			const response = await apiClient.get<Customers[]>('orders/customers')
			setCustomers(response.data)
			setLoading(false)
		} catch (e: unknown) {
			const error = e as AxiosError
			setLoading(false)
			setError(error.message)
		}
	}

	useEffect(() => {
		fetchPrices()
	}, [])

	// SORT
	customers.sort((a, b) => (a.customer > b.customer ? 1 : -1))

	return { customers, error, loading }
}
