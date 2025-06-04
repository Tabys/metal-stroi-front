import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import apiClient from '../components/apiClient'

type User = {
	id: number
	username: string
	first_name: string
	last_name: string
	role_id: string
}

export function useUsers(id?: string) {
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function fetchUsers() {
		try {
			setError('')
			setLoading(true)
			const response = await apiClient.get<User[]>(`users/`)
			setUsers(response.data)
			setLoading(false)
		} catch (e: unknown) {
			const error = e as AxiosError
			setLoading(false)
			setError(error.message)
		}
	}

	useEffect(() => {
		fetchUsers()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { users, error, loading, fetchUsers }
}
