import { Detail, Order } from '../../../models'
import { FormDetailItem } from './formDetailItem'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import { useUser } from '../../../hooks/curentUser'

interface FormProps {
	orderData: Order
	details: Detail[]
}

export function FormDetailList({ details, orderData }: FormProps) {
	// if (currentUser?.roles === 'ROLE_USER' && ){}

	const [alertShow, setAlertShow] = useState(false)
	const [rollAlertShow, setRollAlertShow] = useState(false)
	const [serviseAlertShow, setServiseAlertShow] = useState(false)
	const [minPriceInf, setMinPriceInf] = useState<number | undefined>(
		undefined
	)

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

	const openServiseAlert = (min_price: number | undefined) => {
		setServiseAlertShow(true)
		setMinPriceInf(min_price)
		setTimeout(() => {
			setServiseAlertShow(false)
		}, 2000)
	}

	return (
		<>
			{details.map((item, index) => (
				<FormDetailItem
					updDetail={openAlert}
					rollAlert={openRollAlert}
					serviseAlert={openServiseAlert}
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
				show={serviseAlertShow}
				variant='danger'
			>
				Стоимость не должна быть меньше {minPriceInf}
			</Alert>
		</>
	)
}
