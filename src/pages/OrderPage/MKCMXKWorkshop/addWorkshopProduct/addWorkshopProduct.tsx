import Form from 'react-bootstrap/Form'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AddWorkshopProductType } from '../../../../models'
import apiClient from '../../../../components/apiClient'

type addAddWorkshopProductTypeProps = {
	onCreate: () => void
	onClose: () => void
	order_id?: number
}

export function AddWorkshopProduct({ onCreate, onClose, order_id }: addAddWorkshopProductTypeProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddWorkshopProductType>()

	const onSubmit: SubmitHandler<AddWorkshopProductType> = async data => {
		await apiClient.post<AddWorkshopProductType>('workshops-products/', data)
		onCreate()
		onClose()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type='hidden' {...register('order_id', { valueAsNumber: true })} defaultValue={order_id} />
			<div className='mb-3'>
				<label className='form-label'>Назавние позиции</label>
				<input {...register('name', { required: 'Это поле обязательное' })} className={errors.name ? 'form-control is-invalid' : 'form-control'} />
				{errors.name && <Form.Text className='text-danger'>{errors.name.message}</Form.Text>}
			</div>
			<div className='mb-3'>
				<label className='form-label'>Количество</label>
				<input
					{...register('quantity', { required: 'Это поле обязательное', valueAsNumber: true })}
					defaultValue={1}
					type='number'
					className={errors.quantity ? 'form-control is-invalid' : 'form-control'}
				/>
				{errors.quantity && <Form.Text className='text-danger'>{errors.quantity.message}</Form.Text>}
			</div>

			<button type='submit' className='btn btn-primary container-fluid mt-5'>
				Создать
			</button>
		</form>
	)
}
