import { useState } from 'react'
import { AddWorkshopProductModal } from '../../../components/modal/AddWorkshopProductMoadl'
import { Order, PaintingMods, UserData } from '../../../models'
import { WorkshopProductsTable } from './workshopProductsTable/workshopProductsTable'
import { WorkshopsTable } from './workshopsTable/workshopsTable'
import { Alert, ListGroup } from 'react-bootstrap'
import { DelWorkshopProductsModal } from '../../../components/modal/DelWorkshopProductsModal'
import { WorkshopSummaryTable } from './workshopSummaryTable/WorkshopsSummaryTable'
import { workshopOrderTotalData } from './workshopTotalData/workshopOrderTotalData'
import { useRates } from '../../../hooks/useRates'
import { CopyOrderModal } from '../../../components/modal/CopyOrderModal'
import { UpdBX24Data } from '../LaserWorkshop/updBX24Data/updBX24Data'
import { TransformDate } from '../../../components/TransformDate'
import { Link } from 'react-router-dom'
import { FaFileLines } from 'react-icons/fa6'
import { SendPDFForm } from '../../../components/sendPDF'

type MKCMXKWorkshopProps = {
	id?: string
	order: Order
	user?: UserData
	paintingMods: PaintingMods[]
	updateOrders: () => void
}

export function MKCMXKWorkshop({ id, user, paintingMods, updateOrders, order }: MKCMXKWorkshopProps) {
	const { rates } = useRates()

	const [alertShow, setAlertShow] = useState({
		action: false,
		type: 'success',
		message: 'Изменения сохранены',
	})

	const total = workshopOrderTotalData({
		products: order?.workshops_products,
		rates,
		workshopData: order?.workshops_data,
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
		}, 1000)
	}

	return (
		<>
			<div className='group-controll'>
				<div className='d-flex flex-row align-items-center'>
					<div className='alert alert-primary p-2 mb-0' role='alert'>
						ID сделки: <strong>{order?.id}</strong>
					</div>
					<div className='alert alert-primary p-2 mb-0 mx-2' role='alert'>
						Дата создания сделки:{' '}
						<strong>
							<TransformDate orderDate={order?.date_create} />
						</strong>
					</div>
					<div>
						<UpdBX24Data user={user} order={order} onUpd={updateOrders} />
					</div>
				</div>
			</div>

			<WorkshopsTable order={order} onCreate={updateOrders} rates={rates} total={total} openAlert={openAlert} />

			<WorkshopProductsTable
				order={order}
				paintingMods={paintingMods}
				rates={rates}
				allMaterialWeight={total.weight}
				onCreate={updateOrders}
				openAlert={openAlert}
			/>

			<WorkshopSummaryTable order={order} onCreate={updateOrders} openAlert={openAlert} />

			<div className='fixed-element'>
				<AddWorkshopProductModal onAdd={updateOrders} order_id={Number(id)} />
				<CopyOrderModal order={order} user={user} />
				{order?.workshops_products?.length ? <DelWorkshopProductsModal onDel={updateOrders} order={order} /> : ''}
			</div>

			<div className='bottom-fixed-element'>
				<div className='px-5'>
					<ListGroup horizontal>
						<ListGroup.Item variant='light'>
							<Link relative='path' to={`doc-painting-wh`}>
								<FaFileLines /> Полимерка
							</Link>
						</ListGroup.Item>
						<ListGroup.Item variant='light'>
							<SendPDFForm orderId={Number(id)} total={total.cost} api={'pdf-workshops'} order={order} update={updateOrders} />
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
