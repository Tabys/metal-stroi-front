import { SubmitHandler, useForm } from 'react-hook-form'
import { CopyOrder } from '../../../models'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../../components/apiClient'

type CopyOrderDataProps = {
	orderID: number
	onClose: () => void
}
export function CopyOrderData({ orderID, onClose }: CopyOrderDataProps) {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CopyOrder>()

	const onSubmit: SubmitHandler<CopyOrder> = async data => {
		await apiClient.post<CopyOrder>('import/', data)
		await onClose()
		await navigate(`/order/${data.id}`)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register('copied_order')} defaultValue={orderID} type='hidden' />
			<div className='mb-3'>
				<label className='form-label'>ID новой сделки</label>
				<input {...register('id', { required: 'Это поле обязательное' })} className={errors.id ? 'form-control is-invalid' : 'form-control'} />
				{errors.id && <Form.Text className='text-danger'>{errors.id.message}</Form.Text>}
			</div>

			<button type='submit' className='btn btn-primary container-fluid mt-5'>
				Создать
			</button>
		</form>
	)
}
