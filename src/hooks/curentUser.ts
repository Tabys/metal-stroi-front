import { useEffect, useState } from 'react'
import AuthService from '../services/auth.service'

export function useUser() {
	const [currentUser, setCurrentUser] = useState(undefined)

	useEffect(() => {
		const user = AuthService.getCurrentUser()
		if (user) {
			setCurrentUser(user)
		}
	}, [])

	return { currentUser }
}
