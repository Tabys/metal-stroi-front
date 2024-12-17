import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { PriceServiceCategory } from '../models'
import apiClient from '../components/apiClient'

export function useServicePrices() {
	const [prices, setPrices] = useState<PriceServiceCategory[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	function addPrice() {
		console.log('DONE')
	}

	async function fetchPrices() {
		try {
			setError('')
			setLoading(true)
			const response = await apiClient.get<PriceServiceCategory[]>('price-services-category')
			setPrices(response.data)
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
	prices.sort((a, b) => (a.id > b.id ? 1 : -1))
	prices.forEach(item => {
		item?.price_services_items?.sort((a, b) => (a.id > b.id ? 1 : -1))
		item?.price_services_rollings?.sort((a, b) => (a.id > b.id ? 1 : -1))
		item?.price_services_paintings?.sort((a, b) => (a.id > b.id ? 1 : -1))
	})

	return { prices, error, loading, addPrice }
}
