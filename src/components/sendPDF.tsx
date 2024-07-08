import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SendPDF } from '../models'
import { MdIosShare } from 'react-icons/md'
import Tooltip from '../components/Tooltip'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'

type SendPdfProps = {
	orderId: number
}

export function SendPDFForm({ orderId }: SendPdfProps) {
	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const { register, handleSubmit, setError } = useForm<SendPDF>()

	const onSubmit: SubmitHandler<SendPDF> = async data => {
		await axios
			.post<SendPDF>(process.env.REACT_APP_BACKEND_API_URL + 'pdf', data)
			.then(result => {
				openAlert()
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
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('id')}
					type='hidden'
					defaultValue={orderId}
				/>
				<Tooltip conditions={true} text='Отправить документы в Битрикс'>
					<button type='submit' className='custom-btn'>
						<MdIosShare />
					</button>
				</Tooltip>
			</form>
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Документы и информация отправлены в BX24
			</Alert>
		</>
	)
}
