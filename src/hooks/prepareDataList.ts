import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Order } from '../models'
import apiClient from '../components/apiClient'

export function useOrders(id: string) {
	const [orders, setOrders] = useState<Order>()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function fetchOrders() {
		try {
			setError('')
			setLoading(true)
			const response = await apiClient.get<Order>(`orders/${id}`)
			setOrders(response.data)
			setLoading(false)
		} catch (e: unknown) {
			const error = e as AxiosError
			setLoading(false)
			setError(error.message)
		}
	}

	useEffect(() => {
		fetchOrders()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { orders, error, loading }
}
