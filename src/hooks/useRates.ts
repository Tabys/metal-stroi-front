import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Rates } from '../models'
import apiClient from '../components/apiClient'

export function useRates() {
	const [rates, setRates] = useState<Rates[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function fetchPrices() {
		try {
			setError('')
			setLoading(true)
			const response = await apiClient.get<Rates[]>('price-rates-item', {
				params: {
					category: 'rate',
				},
			})
			setRates(response.data)
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

	return { rates, error, loading }
}
