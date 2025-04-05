import { Order } from '../models'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Form, Spinner } from 'react-bootstrap'
import { useUser } from '../hooks/currentUser'
import apiClient from './apiClient'
import { useState } from 'react'

type CreateOrderProps = {
	onCreate: () => void
	addItem: (order: Order) => void
}

export function CreateOrder({ onCreate, addItem }: CreateOrderProps) {
	const [isLoading, setIsLoading] = useState(false)
	const { currentUser } = useUser()

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Order>()

	const onSubmit: SubmitHandler<Order> = async data => {
		setIsLoading(true)
		data.implementer = currentUser?.last_name + ' ' + currentUser?.first_name
		data.implementer = currentUser?.last_name + ' ' + currentUser?.first_name
		await apiClient
			.post<Order>('import/', data)
			.then(result => {
				onCreate()
				addItem(data)
				setIsLoading(false)
			})
			.catch(err => {
				console.log(err.response)
				if (err.response.status > 200) {
					setError('root.serverError', {
						type: err.response.status,
						message: err.response.data.message,
					})
					setIsLoading(false)
				}
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* <input
				type='hidden'
				{...register('implementer')}
				defaultValue={''}
			/> */}
			<label htmlFor='title' className='form-label'>
				ID Смарт-процесса
			</label>
			<input
				{...register('id', { required: 'Это поле обязательное' })}
				className={errors.id || errors.root ? 'form-control is-invalid' : 'form-control'}
				type='numer'
				disabled={isLoading}
				id='id'
			/>
			{errors.id && <Form.Text className='text-danger'>{errors.id.message}</Form.Text>}
			{errors.root?.serverError.type === 400 && <Form.Text className='text-danger'>{errors?.root?.serverError.message}</Form.Text>}
			<button type='submit' className='btn btn-primary container-fluid mt-5' disabled={isLoading}>
				{isLoading ? <Spinner animation='border' /> : 'Добавить'}
			</button>
		</form>
	)
}
