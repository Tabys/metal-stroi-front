import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { PriceRatesCategory } from '../models'
import apiClient from '../components/apiClient'

export function useTariffsAndRates() {
	const [rates, setRates] = useState<PriceRatesCategory[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	function update() {
		fetchPrices()
	}

	async function fetchPrices() {
		try {
			setError('')
			setLoading(true)
			const responseRates = await apiClient.get<PriceRatesCategory[]>('price-rates-category')
			setRates(responseRates.data)
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

	return { rates, error, loading, update }
}
