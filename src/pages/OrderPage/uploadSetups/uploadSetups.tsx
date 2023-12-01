import axios from 'axios'
import { Upload } from '../../../models'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Form } from 'react-bootstrap'

type uploadSetupsProps = {
	onCreate: () => void
	orderId: number
}

export function UploadSetups({ onCreate, orderId }: uploadSetupsProps) {
	const setupData = new FormData()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Upload>()

	const onSubmit: SubmitHandler<Upload> = async data => {
		setupData.append('order_id', String(orderId))
		for (let file of data.files) {
			setupData.append('files', file)
		}

		await axios.post<Upload>(
			process.env.REACT_APP_BACKEND_API_URL + 'upload/',
			setupData
		)
		onCreate()
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
			/>
			{errors.files && (
				<Form.Text className='text-danger'>
					{errors.files.message}
				</Form.Text>
			)}
			<button
				type='submit'
				className='btn btn-primary container-fluid mt-5'
			>
				Загрузить
			</button>
		</form>
	)
}
