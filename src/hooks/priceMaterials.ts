import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { MetalType } from '../models'

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
			const response = await axios.get<MetalType[]>(
				process.env.REACT_APP_BACKEND_API_URL + 'price-metal-category'
			)
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
