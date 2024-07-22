import { Detail, Order } from '../../../models'
import { FormDetailItem } from './formDetailItem'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'

interface FormProps {
	orderData: Order
	details: Detail[]
}

export function FormDetailList({ details, orderData }: FormProps) {
	const [alertShow, setAlertShow] = useState(false)
	const [rollAlertShow, setRollAlertShow] = useState(false)

	const openRollAlert = (roll?: boolean) => {
		setRollAlertShow(true)
		setTimeout(() => {
			setRollAlertShow(false)
		}, 2000)
	}

	const openAlert = (roll?: boolean) => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	return (
		<>
			{details.map((item, index) => (
				<FormDetailItem
					updDetail={openAlert}
					rollAlert={openRollAlert}
					orderData={orderData}
					DetailItem={item}
					index={index}
					key={item.id}
				/>
			))}
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Изменения сохранены
			</Alert>
			<Alert
				className='alert-fixed'
				show={rollAlertShow}
				variant='warning'
			>
				Уточните техническую возможность вальцевания!
			</Alert>
		</>
	)
}
