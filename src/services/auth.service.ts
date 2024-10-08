import api from './api'
import TokenService from './token.service'

type RegisterProps = {
	first_name: string
	last_name: string
	username: string
	email: string
	password: string
	role_id: number
}
type LoginProps = {
	username: string
	password: string
}

const register = ({
	first_name,
	last_name,
	username,
	email,
	password,
	role_id,
}: RegisterProps) => {
	return api.post('/auth/signup', {
		first_name,
		last_name,
		username,
		email,
		password,
		role_id,
	})
}

const login = ({ username, password }: LoginProps) => {
	return api
		.post('/auth/signin', {
			username,
			password,
		})
		.then(response => {
			if (response.data.accessToken) {
				TokenService.setUser(response.data)
			}

			return response.data
		})
}

const logout = () => {
	TokenService.removeUser()
}

const getCurrentUser = () => {
	const user = localStorage.getItem('user')
	if (user) {
		return JSON.parse(user)
	} else {
		return console.log('Пользователя не существует')
	}
}

const AuthService = {
	register,
	login,
	logout,
	getCurrentUser,
}

export default AuthService
