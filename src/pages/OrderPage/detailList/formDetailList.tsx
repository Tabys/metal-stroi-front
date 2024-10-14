import { Detail, DocTableDetail, Order } from '../../../models'
import { FormDetailItem } from './formDetailItem'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import { PrepArrDetils } from '../documents/components/prepArrDetails/prepArrDetails'
import { PrepArrProducts } from '../documents/components/prepArrProducts'
import { CulcTotalData } from '../documents/components/culcTotalData'
import styles from './style.module.css'

interface FormProps {
	orderData: Order
	details: Detail[]
}

export function FormDetailList({ details, orderData }: FormProps) {
	const editedDetails: DocTableDetail[] | undefined = PrepArrDetils({
		arrDetails: details,
		orders: orderData,
	})
	const products = PrepArrProducts(orderData)
	const total = CulcTotalData({ details: editedDetails, products, orders: orderData })

	const [alertShow, setAlertShow] = useState(false)
	const [rollAlertShow, setRollAlertShow] = useState(false)
	const [serviseAlertShow, setServiseAlertShow] = useState(false)
	const [minPriceInf, setMinPriceInf] = useState<number | undefined>(undefined)

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
					delivery={total.oneKgDelivery}
					editedDetails={editedDetails}
					index={index}
					key={item.id}
				/>
			))}
			<table className={styles.table_total}>
				<tr>
					<td colSpan={8}>Итого по всему заказу (учитывая изделия)</td>
					<td>
						<strong>{total.choping}</strong>
					</td>
					<td></td>
					<td>
						<strong>{total.bending}</strong>
					</td>
					<td></td>
					<td></td>
					<td>
						<strong>{total.painting}</strong>
					</td>
					<td></td>
					<td>
						<strong>{total.rolling}</strong>
					</td>
					<td>
						<strong>{total.drowing}</strong>
					</td>
					<td>
						<strong>{total.cuting}</strong>
					</td>
					<td></td>
					<td>
						<strong>{total.metal}</strong>
					</td>
					<td>
						<strong>{total.price}</strong>
					</td>
				</tr>
			</table>

			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Изменения сохранены
			</Alert>
			<Alert className='alert-fixed' show={rollAlertShow} variant='warning'>
				Уточните техническую возможность вальцевания!
			</Alert>
			<Alert className='alert-fixed' show={serviseAlertShow} variant='danger'>
				Стоимость не должна быть меньше {minPriceInf}
			</Alert>
		</>
	)
}
