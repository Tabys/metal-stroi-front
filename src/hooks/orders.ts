import { AxiosError } from 'axios'
import { useCallback, useState } from 'react'
import { Order } from '../models'
import apiClient from '../components/apiClient'

export function useOrders() {
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [totalItems, setTotalItems] = useState(0) // Общее количество сделок

	const fetchOrders = useCallback(
		async (params: {
			id?: string
			name?: string
			customer?: string
			creator?: string
			date?: string // Конкретная дата
			page: number
			itemsPerPage: number
		}) => {
			try {
				setLoading(true)
				setError('')
				const response = await apiClient.get('orders', {
					params, // Параметры передаются через query
				})
				setOrders(response.data.orders)
				setTotalItems(response.data.totalItems)
			} catch (e: unknown) {
				const error = e as AxiosError
				setError(error.message)
			} finally {
				setLoading(false)
			}
		},
		[]
	)

	return { orders, totalItems, error, loading, fetchOrders }
}
