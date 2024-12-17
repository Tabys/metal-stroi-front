import { Upload } from '../../../models'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Form } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { useState } from 'react'
import apiClient from '../../../components/apiClient'

type uploadSetupsProps = {
	onCreate: () => void
	closeModal: () => void
	orderId: number
}

export function UploadSetups({ onCreate, closeModal, orderId }: uploadSetupsProps) {
	const setupData = new FormData()
	const [load, setLoad] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Upload>()

	const onSubmit: SubmitHandler<Upload> = async data => {
		await setupData.append('order_id', String(orderId))
		for await (let file of data.files) {
			setupData.append('files', file)
		}
		await setLoad(true)
		await apiClient.post<Upload>('upload/', setupData).then(async response => {
			if (response) {
				await setTimeout(() => {
					setLoad(false)
					onCreate()
					closeModal()
				}, 300)
			}
		})
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
			<label htmlFor='title' className='form-label'>
				Файлы
			</label>
			<input type='hidden' {...register('order_id')} defaultValue={orderId} />
			<input
				{...register('files', { required: 'Это поле обязательное' })}
				className={errors.files ? 'form-control is-invalid' : 'form-control'}
				type='file'
				id='files'
				multiple
				disabled={load === true ? true : false}
			/>
			{errors.files && <Form.Text className='text-danger'>{errors.files.message}</Form.Text>}
			<button type='submit' className='btn btn-primary container-fluid mt-5' disabled={load === true ? true : false}>
				{load === true ? <Spinner animation='border' /> : 'Загрузить'}
			</button>
		</form>
	)
}
