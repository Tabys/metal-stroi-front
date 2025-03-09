import { useForm, SubmitHandler } from 'react-hook-form'
import { Order, SendPDF } from '../models'
import { MdIosShare } from 'react-icons/md'
import Tooltip from '../components/Tooltip'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import apiClient from './apiClient'

type SendPdfProps = {
	orderId: number
	api: string
	order: Order
	total: number
	update: () => void
}

export function SendPDFForm({ orderId, order, total, api, update }: SendPdfProps) {
	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const { register, handleSubmit, setError } = useForm<SendPDF>()

	const onSubmit: SubmitHandler<SendPDF> = async data => {
		data.cost = total
		await apiClient
			.post<SendPDF>(api, data)
			.then(result => {
				openAlert()
				update()
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
				<input {...register('id')} type='hidden' defaultValue={orderId} />
				<Tooltip conditions={true} text='Отправить в Битрикс'>
					<button type='submit' className={`custom-btn ${Number(total) === Number(order.cost) ? 'btn-green' : 'btn-red'}`}>
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
