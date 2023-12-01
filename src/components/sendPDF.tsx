import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SendPDF } from '../models'

type SendPdfProps = {
	orderId: number
}

export function SendPDFForm({ orderId }: SendPdfProps) {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<SendPDF>()

	const onSubmit: SubmitHandler<SendPDF> = async data => {
		await axios
			.post<SendPDF>(process.env.REACT_APP_BACKEND_API_URL + 'pdf', data)
			.then(result => {
				console.log(result)
			})
			.catch(err => {
				console.log(err.response)
				if (err.response.status > 200) {
					setError('root.serverError', {
						type: err.response.status,
						message: err.response.data.message,
					})
				}
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='sendPdf'>
			<input {...register('id')} type='hidden' defaultValue={orderId} />

			<button type='submit' className='btn btn-primary'>
				Отправить документы
			</button>
		</form>
	)
}
