import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { WorkPiece } from '../models'
import apiClient from '../components/apiClient'

export function useWorkPiece() {
	const [workPiece, setWorkPiece] = useState<WorkPiece[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function fetchPrices() {
		try {
			setError('')
			setLoading(true)
			const response = await apiClient.get<WorkPiece[]>('work-piece')
			setWorkPiece(response.data)
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

	return { workPiece, error, loading }
}
