import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AuthService from '../services/auth.service'
import axios from 'axios'
import TokenService from '../services/token.service'
import { useNavigate } from 'react-router-dom'

const logOut = () => {
	AuthService.logout()
}

type Token = {
	refreshToken: string
	accessToken?: string
}

const parseJwt = (token: string) => {
	try {
		return JSON.parse(atob(token.split('.')[1]))
	} catch (e) {
		return null
	}
}

export function AuthVerify() {
	const navigate = useNavigate()
	let location = useLocation()
	useEffect(() => {
		const preUser = localStorage.getItem('user')
		const refToken = async (token: string) => {
			await axios
				.post<Token>(
					process.env.REACT_APP_BACKEND_API_URL + 'auth/refreshtoken',
					{
						refreshToken: token,
					}
				)
				.then(result => {
					if (result.data.accessToken) {
						TokenService.updateLocalAccessToken(
							result.data.accessToken
						)
					} else {
						logOut()
					}
				})
				.catch(err => {
					console.log('Рефреш токен истек')
					logOut()
					navigate(`/`)
					window.location.reload()
				})
		}

		if (preUser) {
			const user = JSON.parse(preUser)
			if (user) {
				const decodedJwt = parseJwt(user.accessToken)
				if (decodedJwt.exp * 1000 < Date.now()) {
					refToken(user.refreshToken)
				}
			} else {
				logOut()
			}
		} else {
			return console.log('Пользователь не существует')
		}
	}, [location, navigate])

	return <></>
}
