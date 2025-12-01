import { useForm, SubmitHandler } from 'react-hook-form'
import { Form, Spinner } from 'react-bootstrap'
import { PPArea } from '../../models'
import apiClient from '../../components/apiClient'
import { useState } from 'react'

type AddPPAreaProps = {
	onCreate: () => void
	onClose: () => void
	categoryId: number
	refetchPrices: () => void
}

export function AddPPArea({ onCreate, onClose, categoryId, refetchPrices }: AddPPAreaProps) {
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<PPArea>()

	const onSubmit: SubmitHandler<PPArea> = async data => {
		data.price_services_category_id = categoryId
		setIsLoading(true)
		await apiClient
			.post<PPArea>('price-services-painting-area', data)
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
				Площадь, м2
				<input
					{...register('area', { required: 'Это поле обязательное', valueAsNumber: true })}
					className={errors.area ? 'form-control is-invalid' : 'form-control'}
					type='number'
					id='name'
					defaultValue={0}
					step={0.0001}
				/>
				{errors.area && <Form.Text className='text-danger'>{errors.area.message}</Form.Text>}
			</label>

			<label htmlFor='cost' className='form-label mt-3 w-100'>
				Тариф, руб/м²
				<input
					{...register('cost', { required: 'Это поле обязательное', valueAsNumber: true })}
					className={errors.cost ? 'form-control is-invalid' : 'form-control'}
					type='number'
					id='cost'
					defaultValue={0}
				/>
				{errors.cost && <Form.Text className='text-danger'>{errors.cost.message}</Form.Text>}
			</label>

			{errors.root?.serverError.type !== 200 && <Form.Text className='text-danger'>{errors?.root?.serverError.message}</Form.Text>}
			<button type='submit' className='btn btn-primary container-fluid mt-3' disabled={isLoading}>
				{isLoading ? <Spinner /> : 'Добавить'}
			</button>
		</form>
	)
}
