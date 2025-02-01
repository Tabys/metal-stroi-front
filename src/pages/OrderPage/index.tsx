import { AxiosError } from 'axios'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Order } from '../../models'
import { DetailList } from './detailList/detailList'
import { UploadSetupModal } from '../../components/modal/UploadSetupModal'
import { TransformDate } from '../../components/TransformDate'
import { FormOrderController } from './orderController/formOrderController'
import ListGroup from 'react-bootstrap/ListGroup'
import { SendPDFForm } from '../../components/sendPDF'
import { FaFileLines } from 'react-icons/fa6'
import { MetalList } from './metalList/metalList'
import { AddProductModal } from '../../components/modal/AddProductModal'
import { ProductList } from './productList/productList'
import { AddSuffixModal } from '../../components/modal/AddSuffixAndMetalsModal'
import { CopyOrderModal } from '../../components/modal/CopyOrderModal'
import { AddDetailSetupModal } from '../../components/modal/AddDetailSetupModal'
import { DelSetupModal } from '../../components/modal/DelSetupModal'
import { UpdBX24Data } from './updBX24Data/updBX24Data'
import apiClient from '../../components/apiClient'

export function EmptySetup() {
	return <p>Элементов нет</p>
}

export function OrderPage() {
	// Display order information
	const [order, setOrder] = useState<Order | null>(null)
	const { id } = useParams()

	const updateOrders = async () => {
		await getOrder(Number(id))
	}

	async function getOrder(id: number) {
		try {
			let response = await apiClient.get<Order>(`orders/${id}`)
			await setOrder(response.data)
		} catch (e: unknown) {
			const error = e as AxiosError
			console.log({ error })
		}
	}

	useEffect(() => {
		if (id) {
			getOrder(Number(id))
		}
	}, [id])

	return (
		<>
			<div className='container-flued px-5 mb-5 main-page'>
				<div className='row  g-2'>
					<Link to={`/`} className='back-link'>
						Вернуться назад
					</Link>
					<h1>
						№{order?.id} {order?.customer}
					</h1>
					<h2>"{order?.title}"</h2>
				</div>

				{!order?.setups?.length && EmptySetup()}
				{order?.setups?.length ? (
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
									<UpdBX24Data order={order} onUpd={updateOrders} />
								</div>
							</div>

							<FormOrderController orderData={order} updated={updateOrders} />
						</div>

						<DetailList dataOrder={order} updated={updateOrders} />

						<ProductList dataOrder={order} delProduct={updateOrders} updData={updateOrders} />

						{order.metals ? <MetalList metal={order.metals} updMetal={updateOrders} /> : ''}

						{/* FIXED INTERFACE ELEMENTS */}
						<div className='fixed-element'>
							<UploadSetupModal onCreate={updateOrders} orderId={Number(id)} />
							<AddDetailSetupModal onAdd={updateOrders} setups={order.setups} order_id={order.id} />
							<CopyOrderModal order={order} />
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
										<SendPDFForm orderId={Number(id)} />
									</ListGroup.Item>
								</ListGroup>
							</div>
						</div>
					</>
				) : (
					<div className='fixed-element'>
						<UploadSetupModal onCreate={updateOrders} orderId={Number(id)} />
						<AddDetailSetupModal onAdd={updateOrders} setups={order?.setups} order_id={order?.id} />
					</div>
				)}
			</div>
		</>
	)
}
