import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { PaintingMods } from '../models'
import apiClient from '../components/apiClient'

export function usePaintingMods() {
	const [paintingMods, setPainitngMods] = useState<PaintingMods[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function fetchPaintingMods() {
		try {
			setError('')
			setLoading(true)
			const response = await apiClient.get<PaintingMods[]>('price-services-painting-mods/')
			setPainitngMods(response.data)
			setLoading(false)
		} catch (e: unknown) {
			const error = e as AxiosError
			setLoading(false)
			setError(error.message)
		}
	}

	useEffect(() => {
		fetchPaintingMods()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { paintingMods, error, loading }
}
