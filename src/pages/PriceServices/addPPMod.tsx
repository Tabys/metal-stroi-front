import { useForm, SubmitHandler } from 'react-hook-form'
import { Form, Spinner } from 'react-bootstrap'
import { PPMod } from '../../models'
import apiClient from '../../components/apiClient'
import { useState } from 'react'

type AddPPModProps = {
	onCreate: () => void
	onClose: () => void
	categoryId: number
	refetchPrices: () => void
}

export function AddPPMod({ onCreate, onClose, categoryId, refetchPrices }: AddPPModProps) {
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<PPMod>()

	const onSubmit: SubmitHandler<PPMod> = async data => {
		data.price_services_category_id = categoryId
		data.added = true
		setIsLoading(true)
		await apiClient
			.post<PPMod>('price-services-painting-mods', data)
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
				Название
				<input
					{...register('name', { required: 'Это поле обязательное' })}
					className={errors.name ? 'form-control is-invalid' : 'form-control'}
					type='text'
					id='name'
					defaultValue=''
				/>
				{errors.name && <Form.Text className='text-danger'>{errors.name.message}</Form.Text>}
			</label>

			<label htmlFor='weight' className='form-label mt-3 w-100'>
				<div className='d-flex align-items-baseline gap-1'>
					Иконка{' '}
					<a
						href='/webfonts/uicons-solid-rounded.html'
						title='icon icons'
						target='_blank'
						rel='noopener noreferrer'
						style={{ textDecoration: 'none' }}
					>
						<i className='fi fi-sr-info'></i>
					</a>
				</div>

				<input
					{...register('icon', { required: 'Это поле обязательное' })}
					className={errors.icon ? 'form-control is-invalid' : 'form-control'}
					type='text'
					id='icon'
					defaultValue=''
				/>
				{errors.icon && <Form.Text className='text-danger'>{errors.icon.message}</Form.Text>}
			</label>

			<label htmlFor='cost' className='form-label mt-3 w-100'>
				Стоимость
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
