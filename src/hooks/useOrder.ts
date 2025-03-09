import { useState, useEffect, useCallback } from 'react'
import { AxiosError } from 'axios'
import apiClient from '../components/apiClient'
import { Order } from '../models'

type OrderProps = {
	id?: string
}

const useOrder = ({ id }: OrderProps) => {
	const [order, setOrder] = useState<Order | undefined>(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const getOrder = useCallback(async (orderId: number) => {
		try {
			setIsLoading(true)
			const response = await apiClient.get<Order>(`orders/${orderId}`)
			setOrder(response.data)
			setIsLoading(false)
		} catch (e: unknown) {
			setIsLoading(false)
			const error = e as AxiosError
			console.error('Error fetching order:', error)
		}
	}, [])

	useEffect(() => {
		if (id) {
			getOrder(Number(id))
		}
	}, [id, getOrder])

	const updateOrders = useCallback(async () => {
		if (id) {
			await getOrder(Number(id))
		}
	}, [id, getOrder])

	return { order, isLoading, updateOrders }
}

export default useOrder
