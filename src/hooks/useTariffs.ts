import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { PriceTariffsItem } from '../models'
import apiClient from '../components/apiClient'

export function useTariffs() {
	const [tariffs, setTariffs] = useState<PriceTariffsItem[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function fetchPrices() {
		try {
			setError('')
			setLoading(true)
			const response = await apiClient.get<PriceTariffsItem[]>('price-rates-item', {
				params: {
					category: 'tariff',
				},
			})
			setTariffs(response.data)
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

	return { tariffs, error, loading }
}
