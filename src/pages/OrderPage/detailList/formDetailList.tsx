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
	const [metalAlertShow, setMetalAlertShow] = useState(false)

	const openRollAlert = () => {
		setRollAlertShow(true)
		setTimeout(() => {
			setRollAlertShow(false)
		}, 2000)
	}

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const openMetalAlert = () => {
		setMetalAlertShow(true)
		setTimeout(() => {
			setMetalAlertShow(false)
		}, 2000)
	}

	return (
		<>
			{details.map((item, index) => (
				<FormDetailItem
					updDetail={openAlert}
					rollAlert={openRollAlert}
					metalCostAlert={openMetalAlert}
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
			<Alert
				className='alert-fixed'
				show={metalAlertShow}
				variant='danger'
			>
				Стоимость металла не должна быть меньше установленной!
			</Alert>
		</>
	)
}
