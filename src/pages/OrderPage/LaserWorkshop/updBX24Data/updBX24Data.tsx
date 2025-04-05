import { Alert, Button } from 'react-bootstrap'
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
	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const { handleSubmit } = useForm<UpdBX24>()

	const onSubmit: SubmitHandler<UpdBX24> = async data => {
		await apiClient.post<UpdBX24>('import', {
			id: order?.id,
			implementer: user?.last_name + ' ' + user?.first_name,
		})
		onUpd()
		openAlert()
	}

	return (
		<>
			<Tooltip conditions={true} text='Актуализировать данные из BX24'>
				<Button className='fixed right-175' variant='primary' onClick={handleSubmit(onSubmit)}>
					<i className='fi fi-sr-refresh'></i>
				</Button>
			</Tooltip>
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Информация актуализирована
			</Alert>
		</>
	)
}
