import { ListGroup } from 'react-bootstrap'
import { useMemo } from 'react'
import { AddDetailSetupModal } from '../../../components/modal/AddDetailSetupModal'
import { AddProductModal } from '../../../components/modal/AddProductModal'
import { AddSuffixModal } from '../../../components/modal/AddSuffixAndMetalsModal'
import { CopyOrderModal } from '../../../components/modal/CopyOrderModal'
import { DelSetupModal } from '../../../components/modal/DelSetupModal'
import { UploadSetupModal } from '../../../components/modal/UploadSetupModal'
import { TransformDate } from '../../../components/TransformDate'
import { Order, PaintingMods, UserData } from '../../../models'
import { CreateDetailGroupList } from './detailList/createDetailGroupList'
import { DetailList } from './detailList/detailList'
import { CulcTotalData } from './documents/components/culcTotalData'
import { PrepArrDetails } from './documents/components/prepArrDetails/prepArrDetails'
import { PrepArrProducts } from './documents/components/prepArrProducts'
import { MetalList } from './metalList/metalList'
import { FormOrderController } from './orderController/formOrderController'
import { ProductList } from './productList/productList'
import { UpdBX24Data } from './updBX24Data/updBX24Data'
import { Link } from 'react-router-dom'
import { FaFileLines } from 'react-icons/fa6'
import { SendPDFForm } from '../../../components/sendPDF'
import { useRates } from '../../../hooks/useRates'

type LaserWorkshopProps = {
	id?: string
	order: Order
	user?: UserData
	paintingMods: PaintingMods[]
	updateOrders: () => Promise<void>
}

export function EmptySetup() {
	return <p>Элементов нет</p>
}

export function LaserWorkshop({ id, order, user, paintingMods, updateOrders }: LaserWorkshopProps) {
	const { rates } = useRates()

	// Мемоизируем создание группированного списка деталей
	const detailGroupList = useMemo(() => {
		return CreateDetailGroupList({ dataOrder: order })
	}, [order])

	// Мемоизируем обработку деталей (полная версия)
	const editedDetailsFull = useMemo(() => {
		return PrepArrDetails({
			arrDetails: detailGroupList,
			order: order,
			full: true,
		})
	}, [detailGroupList, order])

	// Мемоизируем обработку деталей (доступная версия)
	const editedDetails = useMemo(() => {
		return PrepArrDetails({
			arrDetails: detailGroupList,
			order: order,
		})
	}, [detailGroupList, order])

	// Мемоизируем обработку продуктов
	const products = useMemo(() => {
		return PrepArrProducts({ order, full_details: editedDetailsFull })
	}, [order, editedDetailsFull])

	// Мемоизируем расчет общих данных
	const total = useMemo(() => {
		return CulcTotalData({
			details: editedDetails,
			full_details: editedDetailsFull,
			products,
			orders: order,
		})
	}, [editedDetails, editedDetailsFull, products, order])

	// Мемоизируем расчет данных только по деталям
	const totalOnlyDetail = useMemo(() => {
		return CulcTotalData({
			details: editedDetailsFull,
			products,
			orders: order,
		})
	}, [editedDetailsFull, products, order])

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
					<div className='alert alert-primary p-2 mb-0' role='alert'>
						Форма оплаты: <strong>{rates.find(rate => rate.bx_id === order?.payment_form)?.name}</strong>
					</div>
					<div className='mx-2'>
						<UpdBX24Data user={user} order={order} onUpd={updateOrders} />
					</div>
				</div>

				<FormOrderController orderData={order} updated={updateOrders} />
			</div>

			<DetailList
				dataOrder={order}
				detailGroupList={detailGroupList}
				editedDetails={editedDetails}
				editedDetailsFull={editedDetailsFull}
				paintingMods={paintingMods}
				total={total}
				totalOnlyDetail={totalOnlyDetail}
				updated={updateOrders}
			/>

			<ProductList
				dataOrder={order}
				editedProducts={products}
				paintingMods={paintingMods}
				total={total}
				delProduct={updateOrders}
				updData={updateOrders}
			/>

			{order.metals ? <MetalList order={order} updMetal={updateOrders} /> : ''}

			{/* FIXED INTERFACE ELEMENTS */}
			<div className='fixed-element'>
				<UploadSetupModal onCreate={updateOrders} orderId={Number(id)} />
				<AddDetailSetupModal onAdd={updateOrders} setups={order.setups} order_id={order.id} />
				<CopyOrderModal order={order} user={user} />
				<AddSuffixModal onAdd={updateOrders} order={order} />
				<AddProductModal order={order} onAdd={updateOrders} />
				<DelSetupModal order={order} onDel={updateOrders} />
			</div>

			<div className='bottom-fixed-element'>
				<div className='px-5'>
					<ListGroup horizontal>
						<ListGroup.Item variant='light'>
							<Link relative='path' to={`group-docs`}>
								<FaFileLines /> Клиенту/В цех
							</Link>
						</ListGroup.Item>
						{/* <ListGroup.Item variant='light'>
										<Link relative='path' to={`doc-client`}>
											<FaFileLines /> Клиенту
										</Link>
									</ListGroup.Item>
									<ListGroup.Item variant='light'>
										<Link relative='path' to={`doc-workshop`}>
											<FaFileLines /> В цех
										</Link>
									</ListGroup.Item> */}
						{/* <ListGroup.Item variant='light'>
										<Link relative='path' to={`doc-order`}>
											<FaFileLines /> Заказ
										</Link>
									</ListGroup.Item> */}
						<ListGroup.Item variant='light'>
							<Link relative='path' to={`doc-painting`}>
								<FaFileLines /> Полимерка
							</Link>
						</ListGroup.Item>
						<ListGroup.Item variant='light'>
							<Link relative='path' to={`doc-specialization`}>
								<FaFileLines /> Спецификация
							</Link>
						</ListGroup.Item>
						{/* <ListGroup.Item variant='light'>
										<Link relative='path' to={`doc-contract`}>
											<FaFileLines /> К договору
										</Link>
									</ListGroup.Item> */}
						<ListGroup.Item variant='light'>
							<SendPDFForm orderId={Number(id)} total={total.price} api={'pdf'} order={order} update={updateOrders} />
						</ListGroup.Item>
					</ListGroup>
				</div>
			</div>
		</>
	)
}
