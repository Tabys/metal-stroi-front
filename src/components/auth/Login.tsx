import { useForm, SubmitHandler } from 'react-hook-form'
import { Login } from '../../models'
import { Form } from 'react-bootstrap'
import styles from './style.module.css'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'

export function LogIn() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Login>()
	console.log(process.env.REACT_APP_BACKEND_API_URL + 'auth/signin')
	const onSubmitLogIn: SubmitHandler<Login> = async data => {
		await axios
			.post<Login>(
				process.env.REACT_APP_BACKEND_API_URL + 'auth/signin',
				data
			)
			.then(result => {
				if (result.data.accessToken) {
					localStorage.setItem('user', JSON.stringify(result.data))
					window.location.reload()
				}

				return result.data
			})
			.catch(err => {
				console.log(err.response)
				if (err.response.status > 200) {
					setError('root.serverError', {
						type: err.response.status,
						message: err.response.data.message,
					})
				}
			})
	}

	return (
		<div id='container' className='container'>
			<div className={styles.auth_wrapper}>
				<div className={styles.auth}>
					<div className={styles.logo}>
						<img src='/favicon.png' alt='logo' />
					</div>
					<form onSubmit={handleSubmit(onSubmitLogIn)}>
						<div className='mb-3'>
							<label className='form-label'>Логин:</label>
							<input
								{...register('username', {
									required: 'Это поле обязательное',
								})}
								className={
									errors.username
										? 'form-control is-invalid'
										: 'form-control'
								}
							/>
							{errors.username && (
								<Form.Text className='text-danger'>
									{errors.username.message}
								</Form.Text>
							)}
						</div>
						<div className='mb-3'>
							<label className='form-label'>Пароль:</label>
							<input
								{...register('password', {
									required: 'Это поле обязательное',
								})}
								type='password'
								className={
									errors.password
										? 'form-control is-invalid'
										: 'form-control'
								}
							/>
							{errors.password && (
								<Form.Text className='text-danger'>
									{errors.password.message}
								</Form.Text>
							)}
						</div>
						<button
							type='submit'
							className='btn btn-primary container-fluid mt-3'
						>
							Войти
						</button>
						{errors.root?.serverError.type ? (
							<Alert
								variant='danger'
								className='alert-fixed mb-0'
							>
								{errors?.root?.serverError.message}
							</Alert>
						) : (
							''
						)}
					</form>
				</div>
			</div>
		</div>
	)
}
