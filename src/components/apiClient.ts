import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import AuthService from '../services/auth.service'

interface RefreshTokenResponse {
	accessToken: string
}

const apiClient = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_API_URL,
	headers: { 'ngrok-skip-browser-warning': 'true' },
})

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

const subscribeTokenRefresh = (cb: (token: string) => void) => {
	refreshSubscribers.push(cb)
}

const onRefreshed = (token: string) => {
	refreshSubscribers.forEach(cb => cb(token))
	refreshSubscribers = []
}

const getLocalAccessToken = (): string | null => {
	const user = JSON.parse(localStorage.getItem('user') || 'null')
	return user?.accessToken || null
}

const getLocalRefreshToken = (): string | null => {
	const user = JSON.parse(localStorage.getItem('user') || 'null')
	return user?.refreshToken || null
}

const updateLocalAccessToken = (newAccessToken: string): void => {
	const user = JSON.parse(localStorage.getItem('user') || 'null')
	if (user) {
		user.accessToken = newAccessToken
		localStorage.setItem('user', JSON.stringify(user))
	}
}

apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		const token = getLocalAccessToken()
		if (token) {
			config.headers['x-access-token'] = token
		}
		return config
	},
	error => Promise.reject(error)
)

apiClient.interceptors.response.use(
	(response: AxiosResponse) => response,
	async error => {
		const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise<AxiosResponse>(resolve => {
					subscribeTokenRefresh(token => {
						originalRequest.headers = { ...originalRequest.headers, 'x-access-token': token }
						resolve(apiClient(originalRequest))
					})
				})
			}

			originalRequest._retry = true
			isRefreshing = true

			try {
				const refreshToken = getLocalRefreshToken()
				if (!refreshToken) throw new Error('Refresh token is missing')

				const response = await axios.post<RefreshTokenResponse>(`${process.env.REACT_APP_BACKEND_API_URL}auth/refreshtoken`, { refreshToken })

				const newAccessToken = response.data.accessToken
				updateLocalAccessToken(newAccessToken)
				apiClient.defaults.headers['x-access-token'] = newAccessToken

				onRefreshed(newAccessToken)
				isRefreshing = false

				originalRequest.headers = { ...originalRequest.headers, 'x-access-token': newAccessToken }
				return apiClient(originalRequest)
			} catch (err) {
				isRefreshing = false
				AuthService.logout()
				window.location.href = '/'
				return Promise.reject(err)
			}
		}

		return Promise.reject(error)
	}
)

export default apiClient
