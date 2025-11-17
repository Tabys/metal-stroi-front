import { useForm, SubmitHandler } from 'react-hook-form'
import { Order, SendPDF } from '../models'
import { MdIosShare } from 'react-icons/md'
import Tooltip from '../components/Tooltip'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import apiClient from './apiClient'
import { Spinner } from 'react-bootstrap'

type SendPdfProps = {
	orderId: number
	api: string
	order: Order
	total: number
	update: () => void
}

export function SendPDFForm({ orderId, order, total, api, update }: SendPdfProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [alertShow, setAlertShow] = useState({
		action: false,
		type: 'success',
		message: 'Изменения сохранены',
	})

	const openAlert = (type: string, message?: string) => {
		setAlertShow({
			action: true,
			type: type,
			message: message ?? 'Изменения сохранены',
		})
		setTimeout(() => {
			setAlertShow({
				action: false,
				type: 'type',
				message: message ?? 'Изменения сохранены',
			})
		}, 1500)
	}

	const { handleSubmit, setError } = useForm<SendPDF>()

	const onSubmit: SubmitHandler<SendPDF> = async data => {
		data.id = orderId
		data.cost = total
		setIsLoading(true)
		await apiClient
			.post<SendPDF>(api, data)
			.then(result => {
				openAlert('success', 'Документы и информация отправлены в BX24')
				update()
			})
			.catch(err => {
				openAlert('danger', 'Ошибка при отправке документов в BX24: ' + err.response.data.message)
				if (err.response.status > 200) {
					setError('root.serverError', {
						type: err.response.status,
						message: err.response.data.message,
					})
				}
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Tooltip conditions={true} text='Отправить в Битрикс'>
					<button type='submit' className={`custom-btn ${Number(total) === Number(order.cost) ? 'btn-green' : 'btn-red'}`} disabled={isLoading}>
						{isLoading ? <Spinner animation='border' size='sm' /> : <MdIosShare />}
					</button>
				</Tooltip>
			</form>
			<Alert className='alert-fixed' show={alertShow.action} variant={alertShow.type}>
				{alertShow.message}
			</Alert>
		</>
	)
}
