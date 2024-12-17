import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { MetalType } from '../models'
import apiClient from '../components/apiClient'

export function useMaterialPrices() {
	const [prices, setPrices] = useState<MetalType[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	function addPrice() {
		console.log('DONE')
	}

	async function fetchPrices() {
		try {
			setError('')
			setLoading(true)
			const response = await apiClient.get<MetalType[]>('price-metal-category')
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
		item?.price_metal_items?.sort((a, b) => (a.id > b.id ? 1 : -1))
	})

	return { prices, error, loading, addPrice }
}
