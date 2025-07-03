import { Alert, Button, Spinner } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Order, UpdBX24, UserData } from '../../../../models'
import Tooltip from '../../../../components/Tooltip'
import { useState } from 'react'
import apiClient from '../../../../components/apiClient'

type UpdBX24DataProps = {
	order: Order | null
	user?: UserData
	onUpd: () => void
}

export function UpdBX24Data({ order, user, onUpd }: UpdBX24DataProps) {
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

	const { handleSubmit } = useForm<UpdBX24>()

	const onSubmit: SubmitHandler<UpdBX24> = async data => {
		setIsLoading(true)
		await apiClient
			.post<UpdBX24>('import', {
				id: order?.id,
				implementer: user?.last_name + ' ' + user?.first_name,
			})
			.then(() => {
				onUpd()
				openAlert('success', 'Информация актуализирована')
				setIsLoading(false)
			})
			.catch(error => {
				setIsLoading(false)
				openAlert('danger', 'Ошибка при обновлении данных из BX24: ' + error.response.data.message)
			})
	}

	return (
		<>
			<Tooltip conditions={true} text='Актуализировать данные из BX24'>
				<Button className='fixed right-175' variant='primary' onClick={handleSubmit(onSubmit)} disabled={isLoading}>
					{isLoading ? <Spinner animation='border' size='sm' /> : <i className='fi fi-sr-refresh'></i>}
				</Button>
			</Tooltip>
			<Alert className='alert-fixed' show={alertShow.action} variant={alertShow.type}>
				{alertShow.message}
			</Alert>
		</>
	)
}
