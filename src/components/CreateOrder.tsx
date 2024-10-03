import axios from 'axios'
import { Order } from '../models'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Form } from 'react-bootstrap'
import { useUser } from '../hooks/curentUser'
import { fireEvent } from '@testing-library/react'

type CreateOrderProps = {
	onCreate: () => void
	addItem: (order: Order) => void
}

export function CreateOrder({ onCreate, addItem }: CreateOrderProps) {
	const { currentUser } = useUser()

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Order>()

	const onSubmit: SubmitHandler<Order> = async data => {
		data.implementer =
			currentUser?.last_name + ' ' + currentUser?.first_name
		await axios
			.post<Order>(
				process.env.REACT_APP_BACKEND_API_URL + 'import/',
				data
			)
			.then(result => {
				onCreate()
				addItem(data)
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
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* <input
				type='hidden'
				{...register('implementer')}
				defaultValue={''}
			/> */}
			<label htmlFor='title' className='form-label'>
				ID сделки
			</label>
			<input
				{...register('id', { required: 'Это поле обязательное' })}
				className={
					errors.id || errors.root
						? 'form-control is-invalid'
						: 'form-control'
				}
				type='numer'
				id='id'
			/>
			{errors.id && (
				<Form.Text className='text-danger'>
					{errors.id.message}
				</Form.Text>
			)}
			{errors.root?.serverError.type === 400 && (
				<Form.Text className='text-danger'>
					{errors?.root?.serverError.message}
				</Form.Text>
			)}
			<button
				type='submit'
				className='btn btn-primary container-fluid mt-5'
			>
				Добавить
			</button>
		</form>
	)
}
