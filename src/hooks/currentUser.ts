import { useEffect, useState } from 'react'
import AuthService from '../services/auth.service'
import { UserData } from '../models'

export function useUser() {
	const [currentUser, setCurrentUser] = useState<UserData | undefined>(
		undefined
	)

	useEffect(() => {
		const user = AuthService.getCurrentUser()
		if (user) {
			setCurrentUser(user)
		}
	}, [])

	return { currentUser }
}
