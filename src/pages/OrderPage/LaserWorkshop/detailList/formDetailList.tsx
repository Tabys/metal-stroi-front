import { Detail, DocTableDetail, Order, PaintingMods, TotalData } from '../../../../models'
import { FormDetailItem } from './formDetailItem'
import Alert from 'react-bootstrap/Alert'
import { useState, memo } from 'react'
import styles from './style.module.css'

interface FormProps {
	orderData: Order
	details: Detail[]
	editedDetails?: DocTableDetail[]
	editedDetailsFull?: DocTableDetail[]
	total: TotalData
	totalOnlyDetail: TotalData
	paintingMods: PaintingMods[]
	updData: () => void
}

export const FormDetailList = memo(function FormDetailList({
	details,
	editedDetails,
	editedDetailsFull,
	total,
	totalOnlyDetail,
	orderData,
	paintingMods,
	updData,
}: FormProps) {
	const [alertShow, setAlertShow] = useState(false)
	const [rollAlertShow, setRollAlertShow] = useState(false)
	const [serviceAlertShow, setServiceAlertShow] = useState(false)
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

	const openServiceAlert = (min_price: number | undefined) => {
		setServiceAlertShow(true)
		setMinPriceInf(min_price)
		setTimeout(() => {
			setServiceAlertShow(false)
		}, 2000)
	}

	return (
		<>
			{details.map((item, index) => (
				<FormDetailItem
					updData={updData}
					updDetail={openAlert}
					rollAlert={openRollAlert}
					serviceAlert={openServiceAlert}
					orderData={orderData}
					DetailItem={item}
					delivery={total.oneKgDelivery}
					editedDetails={editedDetails}
					editedDetailsFull={editedDetailsFull}
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
							<strong>{total.price.toFixed(2)}</strong>
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
			<Alert className='alert-fixed' show={serviceAlertShow} variant='danger'>
				Стоимость не должна быть меньше {minPriceInf}
			</Alert>
		</>
	)
})
