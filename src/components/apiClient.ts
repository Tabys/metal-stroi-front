import axios from 'axios'
import authHeader from './auth/authHeader'

const apiClient = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_API_URL, // Базовый URL вашего API
	headers: authHeader(),
})

export default apiClient
