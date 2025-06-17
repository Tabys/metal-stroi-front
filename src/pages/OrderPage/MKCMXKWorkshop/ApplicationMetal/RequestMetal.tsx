import { FaArrowUpFromBracket } from 'react-icons/fa6'
import apiClient from '../../../../components/apiClient'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { RequestMetalType } from '../../../../models'
import { Alert, Spinner } from 'react-bootstrap'

type RequestMetalProps = {
	order_id: number
	update: () => void
}

export function RequestMetal({ order_id, update }: RequestMetalProps) {
	const [alertShow, setAlertShow] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const { handleSubmit, setError } = useForm<RequestMetalType>()

	const onSubmit: SubmitHandler<RequestMetalType> = async data => {
		data.order_id = order_id
		setIsLoading(true)
		await apiClient
			.post<RequestMetalType>('workshops-data/metal-application', data)
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
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<>
			<form action='' onSubmit={handleSubmit(onSubmit)}>
				<button type='submit' className='request-metal-btn' disabled={isLoading}>
					{isLoading ? <Spinner animation='border' size='sm' /> : <FaArrowUpFromBracket />} Заказать материал
				</button>
			</form>
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Запрос на заказ материала отправлен в BX24
			</Alert>
		</>
	)
}
