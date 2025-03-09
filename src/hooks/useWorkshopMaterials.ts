import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { WorkshopMaterialType } from '../models'
import apiClient from '../components/apiClient'

export function useWorkshopMaterials() {
	const [workshopMaterial, setWorkshopMaterial] = useState<WorkshopMaterialType[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	function updateWorkshopMaterial() {
		fetchPrices()
	}

	async function fetchPrices() {
		try {
			setError('')
			setLoading(true)
			const response = await apiClient.get<WorkshopMaterialType[]>('workshops-materials')
			setWorkshopMaterial(response.data)
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

	return { workshopMaterial, error, loading, updateWorkshopMaterial }
}
