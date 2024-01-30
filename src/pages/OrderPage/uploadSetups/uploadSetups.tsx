import axios from 'axios'
import { Upload } from '../../../models'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Form } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { useState } from 'react'

type uploadSetupsProps = {
	onCreate: () => void
	closeModal: () => void
	orderId: number
}

export function UploadSetups({
	onCreate,
	closeModal,
	orderId,
}: uploadSetupsProps) {
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
		await axios
			.post<Upload>(
				process.env.REACT_APP_BACKEND_API_URL + 'upload/',
				setupData
			)
			.then(async response => {
				if (response) {
					await setLoad(false)
					await onCreate()
				}
			})
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
			<label htmlFor='title' className='form-label'>
				Файлы
			</label>
			<input
				type='hidden'
				{...register('order_id')}
				defaultValue={orderId}
			/>
			<input
				{...register('files', { required: 'Это поле обязательное' })}
				className={
					errors.files ? 'form-control is-invalid' : 'form-control'
				}
				type='file'
				id='files'
				multiple
				disabled={load === true ? true : false}
			/>
			{errors.files && (
				<Form.Text className='text-danger'>
					{errors.files.message}
				</Form.Text>
			)}
			<button
				type='submit'
				className='btn btn-primary container-fluid mt-5'
				disabled={load === true ? true : false}
			>
				{load === true ? <Spinner animation='border' /> : 'Загрузить'}
			</button>
		</form>
	)
}
