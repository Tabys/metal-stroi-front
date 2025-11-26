import { useForm, SubmitHandler } from 'react-hook-form'
import { Form, Spinner } from 'react-bootstrap'
import { Bending } from '../../models'
import apiClient from '../../components/apiClient'
import { useState } from 'react'

type AddBendingProps = {
	onCreate: () => void
	onClose: () => void
	categoryId: number
	refetchPrices: () => void
}

export function AddBending({ onCreate, onClose, categoryId, refetchPrices }: AddBendingProps) {
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Bending>()

	const onSubmit: SubmitHandler<Bending> = async data => {
		data.price_services_category_id = categoryId
		setIsLoading(true)
		await apiClient
			.post<Bending>('price-services-item/bending', data)
			.then(() => {
				setIsLoading(false)
				onClose()
				onCreate()
				refetchPrices()
			})
			.catch(err => {
				if (err.response.status > 200) {
					setError('root.serverError', {
						type: err.response.status,
						message: err.response.data.message,
					})
				}
				setIsLoading(false)
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor='name' className='form-label w-100'>
				Минимальная толщина
				<input
					{...register('metal_thickness_min', { required: 'Это поле обязательное', valueAsNumber: true })}
					className={errors.metal_thickness_min ? 'form-control is-invalid' : 'form-control'}
					type='number'
					id='metal_thickness_min'
					defaultValue={0}
					step={0.1}
				/>
				{errors.metal_thickness_min && <Form.Text className='text-danger'>{errors.metal_thickness_min.message}</Form.Text>}
			</label>

			<label htmlFor='weight' className='form-label mt-3 w-100'>
				Максимальная толщина
				<input
					{...register('metal_thickness_max', { required: 'Это поле обязательное', valueAsNumber: true })}
					className={errors.metal_thickness_max ? 'form-control is-invalid' : 'form-control'}
					type='number'
					id='metal_thickness_max'
					step={0.1}
					defaultValue={0}
				/>
				{errors.metal_thickness_max && <Form.Text className='text-danger'>{errors.metal_thickness_max.message}</Form.Text>}
			</label>

			{errors.root?.serverError.type !== 200 && <Form.Text className='text-danger'>{errors?.root?.serverError.message}</Form.Text>}
			<button type='submit' className='btn btn-primary container-fluid mt-3' disabled={isLoading}>
				{isLoading ? <Spinner /> : 'Добавить'}
			</button>
		</form>
	)
}
