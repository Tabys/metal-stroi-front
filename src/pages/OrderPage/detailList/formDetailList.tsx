import { Detail, DocTableDetail, Order, PaintingMods } from '../../../models'
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
	paintingMods: PaintingMods[]
	updData: () => void
}

export function FormDetailList({ details, orderData, paintingMods, updData }: FormProps) {
	const editedDetails: DocTableDetail[] | undefined = PrepArrDetils({
		arrDetails: details,
		orders: orderData,
	})
	const editedDetailsFull: DocTableDetail[] | undefined = PrepArrDetils({
		arrDetails: details,
		orders: orderData,
		full: true,
	})

	const products = PrepArrProducts(orderData)
	const total = CulcTotalData({ details: editedDetails, products, orders: orderData })
	const totalOnlyDetail = CulcTotalData({ details: editedDetailsFull, products, orders: orderData })

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
					updData={updData}
					updDetail={openAlert}
					rollAlert={openRollAlert}
					serviseAlert={openServiseAlert}
					orderData={orderData}
					DetailItem={item}
					delivery={total.oneKgDelivery}
					editedDetails={editedDetails}
					paintingMods={paintingMods}
					index={index}
					key={item.id}
				/>
			))}
			<table className={styles.table_total}>
				<tbody>
					<tr>
						<td colSpan={3}>Итого по всему заказу (+изделия)</td>
						<td></td>
						<td></td>
						<td>
							<strong>{totalOnlyDetail.metal_all.toFixed(2)}</strong>
						</td>
						<td></td>
						<td></td>
						<td></td>
						<td>
							<strong>{totalOnlyDetail.cuting_all.toFixed(2)}</strong>
						</td>
						<td></td>
						<td>
							<strong>{totalOnlyDetail.bending_all.toFixed(2)}</strong>
						</td>
						<td></td>
						<td>
							<strong>{totalOnlyDetail.choping_all.toFixed(2)}</strong>
						</td>
						<td></td>
						<td>
							<strong>{totalOnlyDetail.rolling_all.toFixed(2)}</strong>
						</td>
						<td></td>
						{/* <td></td> */}
						<td></td>
						<td>
							<strong>{total.painting_all.toFixed(2)}</strong>
						</td>
						<td>
							<strong>{total.drowing.toFixed(2)}</strong>
						</td>
						<td>
							<strong>{total.price}</strong>
						</td>
					</tr>
				</tbody>
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
