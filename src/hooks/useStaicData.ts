import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { StaticData } from '../models'
import apiClient from '../components/apiClient'

export function useStaticData(category?: string) {
	const [staticData, setStaticData] = useState<StaticData[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function fetchStaticData(category?: string) {
		try {
			setError('')
			setLoading(true)
			const response = await apiClient.get<StaticData[]>('static-data', {
				params: {
					...(category && { category }),
				},
			})
			setStaticData(response.data)
			setLoading(false)
		} catch (e: unknown) {
			const error = e as AxiosError
			setLoading(false)
			setError(error.message)
		}
	}

	useEffect(() => {
		fetchStaticData(category)
	}, [category]) // eslint-disable-line react-hooks/exhaustive-deps

	return { staticData, error, loading }
}
