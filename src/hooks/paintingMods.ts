import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { PaintingMods } from '../models'

export function usePaintingMods() {
	const [paintingMods, setPainitngMods] = useState<PaintingMods[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function fetchPaintingMods() {
		try {
			setError('')
			setLoading(true)
			const response = await axios.get<PaintingMods[]>(process.env.REACT_APP_BACKEND_API_URL + 'price-services-painting-mods/')
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
