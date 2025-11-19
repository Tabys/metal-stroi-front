import { SubmitHandler, useForm } from 'react-hook-form'
import { CopyOrder, UserData } from '../../../../models'
import { Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../../../components/apiClient'
import { useState } from 'react'

type CopyOrderDataProps = {
	orderID?: number
	user?: UserData
	onClose: () => void
}
export function CopyOrderData({ orderID, user, onClose }: CopyOrderDataProps) {
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<CopyOrder>()

	const onSubmit: SubmitHandler<CopyOrder> = async data => {
		setIsLoading(true)
		data.implementer = user?.last_name + ' ' + user?.first_name
		await apiClient
			.post<CopyOrder>('oauth/create/', data)
			.then(() => {
				onClose()
				navigate(`/order/${data.id}`)
			})
			.catch(error => {
				console.log(error.response)
				if (error.response.status > 200) {
					setError('root.serverError', {
						type: error.response.status,
						message: error.response.data.message,
					})
				}
				setIsLoading(false)
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register('copied_order')} defaultValue={orderID} type='hidden' />
			<div className='mb-3'>
				<label className='form-label'>ID нового смарт-процесса</label>
				<input {...register('id', { required: 'Это поле обязательное' })} className={errors.id ? 'form-control is-invalid' : 'form-control'} />
				{errors.id && <Form.Text className='text-danger'>{errors.id.message}</Form.Text>}
				{errors.root?.serverError.type === 400 && <Form.Text className='text-danger'>{errors?.root?.serverError.message}</Form.Text>}
			</div>

			<button type='submit' className='btn btn-primary container-fluid mt-5' disabled={isLoading}>
				{isLoading ? <Spinner /> : 'Создать'}
			</button>
		</form>
	)
}
