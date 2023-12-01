import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Order } from '../models'
import { useNavigate } from 'react-router-dom'

export function useOrders(id?: string) {
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const navigate = useNavigate()

	function addOrder(order: Order) {
		navigate(`/order/${order.id}`)
	}

	async function fetchOrders() {
		try {
			setError('')
			setLoading(true)
			const response = await axios.get<Order[]>(
				process.env.REACT_APP_BACKEND_API_URL + `orders/${id ? id : ''}`
			)
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

	return { orders, error, loading, addOrder }
}
