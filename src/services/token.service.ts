type UserProps = {
	username: string
	email: string
	password: string
	role_id: number
}

const getLocalRefreshToken = () => {
	const user = localStorage.getItem('user')
	if (user) {
		const userparse = JSON.parse(user)
		return userparse?.refreshToken
	} else {
		return console.log('Нет рефреш-токена')
	}
}

const getLocalAccessToken = () => {
	const user = localStorage.getItem('user')
	if (user) {
		const userparse = JSON.parse(user)
		return userparse?.accessToken
	} else {
		return console.log('Нет токена доступа')
	}
}

const updateLocalAccessToken = (token: string) => {
	let user = localStorage.getItem('user')
	if (user) {
		let userparse = JSON.parse(user)
		userparse.accessToken = token
		localStorage.setItem('user', JSON.stringify(userparse))
	} else {
		return console.log('Токен не обнавлен')
	}
}

const getUser = () => {
	const user = localStorage.getItem('user')
	if (user) {
		return JSON.parse(user)
	} else {
		return console.log('Пользователя не существует')
	}
}

const setUser = (user: UserProps) => {
	localStorage.setItem('user', JSON.stringify(user))
}

const removeUser = () => {
	localStorage.removeItem('user')
}

const TokenService = {
	getLocalRefreshToken,
	getLocalAccessToken,
	updateLocalAccessToken,
	getUser,
	setUser,
	removeUser,
}

export default TokenService
