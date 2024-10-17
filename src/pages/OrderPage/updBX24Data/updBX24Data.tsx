import { Alert, Button } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaArrowsRotate } from 'react-icons/fa6'
import { Order, UpdBX24 } from '../../../models'
import axios from 'axios'
import Tooltip from '../../../components/Tooltip'
import { useState } from 'react'

type UpdBX24DataProps = {
	order: Order | null
	onUpd: () => void
}

export function UpdBX24Data({ order, onUpd }: UpdBX24DataProps) {
	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const { handleSubmit } = useForm<UpdBX24>()

	const onSubmit: SubmitHandler<UpdBX24> = async data => {
		await axios.post<UpdBX24>(process.env.REACT_APP_BACKEND_API_URL + 'import', {
			id: order?.id,
		})
		await onUpd()
		await openAlert()
	}

	return (
		<>
			<Tooltip conditions={true} text='Акутализировать данные из BX24'>
				<Button className='fixed right-175' variant='primary' onClick={handleSubmit(onSubmit)}>
					<FaArrowsRotate />
				</Button>
			</Tooltip>
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Информация актуализирована
			</Alert>
		</>
	)
}
