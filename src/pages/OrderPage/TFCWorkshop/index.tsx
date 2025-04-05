import { useState } from 'react'
import { Order, Rates, UserData } from '../../../models'
import { Alert, ListGroup } from 'react-bootstrap'
import { CopyOrderModal } from '../../../components/modal/CopyOrderModal'
import { UpdBX24Data } from '../LaserWorkshop/updBX24Data/updBX24Data'
import { TransformDate } from '../../../components/TransformDate'
import { TfcTable } from './TfcTable/TfcTable'
import { TfcDataTable } from './TfcTable/TfcDataTable'
import { TfcCommentField } from './TfcTable/TfcComentField'
import { tfcTotalData } from './tfcTotalData/tfcTotalData'
import { TfcSummaryTable } from './TfcSummaryTable/TfcSummaryTable'
import { SendPDFForm } from '../../../components/sendPDF'

type TFCWorkshopProps = {
	id?: string
	order: Order
	rates: Rates[]
	user?: UserData
	updateOrders: () => void
}

export function TFCWorkshop({ id, rates, user, updateOrders, order }: TFCWorkshopProps) {
	// const { rates } = useRates()

	const [alertShow, setAlertShow] = useState({
		action: false,
		type: 'success',
		message: 'Изменения сохранены',
	})

	const total = tfcTotalData({ details: order?.tfc_details, tfcData: order?.tfc_data })

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
		}, 1000)
	}

	return (
		<>
			<div className='group-controll'>
				<div className='d-flex flex-row align-items-center'>
					<div className='alert alert-primary p-2 mb-0' role='alert'>
						ID Смарт-процесса: <strong>{order?.id}</strong>
					</div>
					<div className='alert alert-primary p-2 mb-0 mx-2' role='alert'>
						Дата создания смарт-процесса:{' '}
						<strong>
							<TransformDate orderDate={order?.date_create} />
						</strong>
					</div>
					<div>
						<UpdBX24Data user={user} order={order} onUpd={updateOrders} />
					</div>
				</div>
			</div>

			<TfcDataTable tfcData={order?.tfc_data} rates={rates} onUpdate={updateOrders} openAlert={openAlert} />

			<TfcTable order={order} total={total} onUpdate={updateOrders} openAlert={openAlert} />

			<TfcCommentField tfcData={order?.tfc_data} openAlert={openAlert} />

			<TfcSummaryTable details={order?.tfc_details} tfcData={order?.tfc_data} total={total} />

			<div className='fixed-element'>
				<CopyOrderModal order={order} user={user} />
			</div>

			<div className='bottom-fixed-element'>
				<div className='px-5'>
					<ListGroup horizontal>
						<ListGroup.Item variant='light'>
							<SendPDFForm orderId={Number(id)} total={total.cost} api={'send-tfc'} order={order} update={updateOrders} />
						</ListGroup.Item>
					</ListGroup>
				</div>
			</div>

			<Alert className='alert-fixed' show={alertShow.action} variant={alertShow.type}>
				{alertShow.message}
			</Alert>
		</>
	)
}
