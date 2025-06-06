import { Alert, Form, Spinner } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { User } from '../../../../models'
import { useState } from 'react'
import styles from './style.module.css'
import apiClient from '../../../../components/apiClient'

export function AddUserForm() {
	const [alertShow, setAlertShow] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm<User>()

	const onSubmit: SubmitHandler<User> = async data => {
		setIsLoading(true)
		await apiClient
			.post<User>('auth/signup', data)
			.then(result => {
				openAlert()
				reset()
				setIsLoading(false)
			})
			.catch(err => {
				setIsLoading(false)
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
		<form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' className={styles.flex}>
			<div className={styles.group}>
				<div className='mb-3'>
					<label className='form-label'>Имя</label>
					<input
						{...register('first_name', {
							required: 'Это поле обязательное',
						})}
						className={errors.first_name ? 'form-control is-invalid' : 'form-control'}
					/>
					{errors.first_name && <Form.Text className='text-danger'>{errors.first_name.message}</Form.Text>}
				</div>
				<div className='mb-3'>
					<label className='form-label'>Логин</label>
					<input
						{...register('username', {
							required: 'Это поле обязательное',
						})}
						className={errors.username ? 'form-control is-invalid' : 'form-control'}
					/>
					{errors.username && <Form.Text className='text-danger'>{errors.username.message}</Form.Text>}
				</div>
			</div>
			<div className={styles.group}>
				<div className='mb-3'>
					<label className='form-label'>Фамилия</label>
					<input
						{...register('last_name', {
							required: 'Это поле обязательное',
						})}
						className={errors.last_name ? 'form-control is-invalid' : 'form-control'}
					/>
					{errors.last_name && <Form.Text className='text-danger'>{errors.last_name.message}</Form.Text>}
				</div>
				<div className='mb-3'>
					<label className='form-label'>Пароль</label>
					<input
						{...register('password', {
							required: 'Это поле обязательное',
						})}
						type='password'
						className={errors.password ? 'form-control is-invalid' : 'form-control'}
					/>
					{errors.password && <Form.Text className='text-danger'>{errors.password.message}</Form.Text>}
				</div>
			</div>
			<div className={styles.full}>
				<div className='mb-3'>
					<label className='form-label'>Роль</label>
					<select
						{...register('role_id', {
							required: 'Это поле обязательное',
						})}
						className={errors.role_id ? 'form-select is-invalid' : 'form-select'}
					>
						<option value='user'>Технолог - Лазерный цех</option>
						<option value='user_workshops'>Технолог - МК СМ ХК</option>
						<option value='user_tfc'>Менеджер ТФЦ</option>
						<option value='moderator'>Модератор</option>
						<option value='admin'>Администратор</option>
					</select>
					{errors.role_id && <Form.Text className='text-danger'>{errors.role_id.message}</Form.Text>}
				</div>
			</div>
			{errors.root?.serverError && (
				<Alert variant='danger' className='alert-fixed mb-0'>
					{errors?.root?.serverError.message}
				</Alert>
			)}

			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Пользователь создан
			</Alert>
			<button type='submit' className='btn btn-primary container-fluid mt-5' disabled={isLoading}>
				{isLoading ? <Spinner /> : 'Создать'}
			</button>
		</form>
	)
}
