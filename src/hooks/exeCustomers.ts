import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { ExeCustomers } from '../models'
import apiClient from '../components/apiClient'

export function useExeCustomers() {
	const [customers, setCustomers] = useState<ExeCustomers[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	function addCustomers() {
		console.log('DONE')
	}

	function update() {
		fetchCustomers()
	}

	async function fetchCustomers() {
		try {
			setError('')
			setLoading(true)
			const response = await apiClient.get<ExeCustomers[]>('exemptionCustomer')
			setCustomers(response.data)
			setLoading(false)
		} catch (e: unknown) {
			const error = e as AxiosError
			setLoading(false)
			setError(error.message)
		}
	}

	useEffect(() => {
		fetchCustomers()
	}, [])

	// SORT
	customers.sort((a, b) => (a.id > b.id ? 1 : -1))

	return { customers, error, loading, addCustomers, update }
}
