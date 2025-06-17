import { useForm, SubmitHandler } from 'react-hook-form'
import { Form, Spinner } from 'react-bootstrap'
import { Nomenclature } from '../../models'
import apiClient from '../../components/apiClient'
import { useState } from 'react'

type AddNomenclatureProps = {
	onCreate: () => void
	onClose: () => void
}

export function AddNomenclature({ onCreate, onClose }: AddNomenclatureProps) {
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Nomenclature>()

	const onSubmit: SubmitHandler<Nomenclature> = async data => {
		setIsLoading(true)
		await apiClient
			.post<Nomenclature>('workshops-materials', data)
			.then(() => {
				setIsLoading(false)
				onClose()
				onCreate()
			})
			.catch(() => {
				setIsLoading(false)
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor='name' className='form-label w-100'>
				Название позиции
				<input
					{...register('name', { required: 'Это поле обязательное' })}
					className={errors.name ? 'form-control is-invalid' : 'form-control'}
					id='name'
					defaultValue=''
				/>
				{errors.name && <Form.Text className='text-danger'>{errors.name.message}</Form.Text>}
			</label>

			<label htmlFor='weight' className='form-label mt-3 w-100'>
				Вес за единицу, кг
				<input
					{...register('weight', { required: 'Это поле обязательное', valueAsNumber: true })}
					className={errors.weight ? 'form-control is-invalid' : 'form-control'}
					type='number'
					id='weight'
					step={0.001}
					defaultValue={0}
				/>
				{errors.weight && <Form.Text className='text-danger'>{errors.weight.message}</Form.Text>}
			</label>

			<label htmlFor='price' className='form-label mt-3 w-100'>
				Цена за единицу
				<input
					{...register('price', { required: 'Это поле обязательное', valueAsNumber: true })}
					className={errors.price ? 'form-control is-invalid' : 'form-control'}
					id='price'
					type='number'
					step={0.001}
					defaultValue={0}
				/>
				{errors.price && <Form.Text className='text-danger'>{errors.price.message}</Form.Text>}
			</label>

			<label htmlFor='bx_id' className='form-label mt-3 w-100'>
				ID в BX24
				<input
					{...register('bx_id', { required: 'Это поле обязательное', valueAsNumber: true })}
					className={errors.bx_id ? 'form-control is-invalid' : 'form-control'}
					id='bx_id'
					type='number'
				/>
				{errors.bx_id && <Form.Text className='text-danger'>{errors.bx_id.message}</Form.Text>}
			</label>

			<button type='submit' className='btn btn-primary container-fluid mt-3' disabled={isLoading}>
				{isLoading ? <Spinner /> : 'Создать'}
			</button>
		</form>
	)
}
