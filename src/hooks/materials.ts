import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Material } from '../models'

export function useMaterials() {
	const [materials, setMaterials] = useState<Material[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	function updMaterial() {
		fetchMaterials()
	}

	async function fetchMaterials() {
		try {
			setError('')
			setLoading(true)
			const response = await axios.get<Material[]>(
				process.env.REACT_APP_BACKEND_API_URL + 'price-metal-item'
			)
			setMaterials(response.data)
			setLoading(false)
		} catch (e: unknown) {
			const error = e as AxiosError
			setLoading(false)
			setError(error.message)
		}
	}

	useEffect(() => {
		fetchMaterials()
	}, [])

	// SORT
	materials.sort((a, b) => (a.id > b.id ? 1 : -1))

	return { materials, error, loading, updMaterial }
}
