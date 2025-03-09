import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Nomenclature } from '../models'
import apiClient from '../components/apiClient'

export function useNomenclatures() {
	const [pricesTSF, setPricesTSF] = useState<Nomenclature[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	function updateTSF() {
		fetchPrices()
	}

	async function fetchPrices() {
		try {
			setError('')
			setLoading(true)
			const response = await apiClient.get<Nomenclature[]>('tsf-materials')
			setPricesTSF(response.data)
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

	return { pricesTSF, error, loading, updateTSF }
}
