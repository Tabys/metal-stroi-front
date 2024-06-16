import axios, { AxiosError } from 'axios'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Order } from '../../models'
import { Badge } from 'react-bootstrap'
import { DetailList } from './detailList/detailList'
import { UploadSetupModal } from '../../components/modal/UploadSetupModal'
import { DeleteSetups } from './deleteSetups/deleteSetups'
import { TransformDate } from '../../components/TransformDate'
import { FormOrderController } from './orderController/formOrderController'
import ListGroup from 'react-bootstrap/ListGroup'
import { SendPDFForm } from '../../components/sendPDF'
import { FaFileLines } from 'react-icons/fa6'
import { MetalList } from './metalList/metalList'
import { AddProductModal } from '../../components/modal/AddProductModal'
import { ProductList } from './productList/productList'
import { AddSuffixModal } from '../../components/modal/AddSuffixModal'
import { CopyOrderModal } from '../../components/modal/CopyOrderModal'
import { AddDetailSetupModal } from '../../components/modal/AddDetailSetupModal'

export function EmptySetup() {
	return <p>Элементов нет</p>
}

export function OrderPage() {
	// Display order information
	const [order, setOrder] = useState<Order | null>(null)
	const { id } = useParams()

	const updateOrders = async () => {
		getOrder(Number(id))
	}

	async function getOrder(id: number) {
		try {
			let response = await axios.get<Order>(
				process.env.REACT_APP_BACKEND_API_URL + `orders/${id}`
			)
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

	// console.log(order)
	return (
		<>
			<div className='container-flued px-5 mb-5'>
				<div className='row  g-2'>
					<Link to={`/`} className='back-link'>
						Вернуться назад
					</Link>
					<h1>
						№{order?.id} {order?.customer}{' '}
						<Badge bg='success'>Сделка</Badge>
					</h1>
					<div className='d-flex flex-row'>
						<div className='alert alert-primary p-2' role='alert'>
							ID сделки: <strong>{order?.id}</strong>
						</div>
						<div
							className='alert alert-primary p-2 mx-2'
							role='alert'
						>
							Дата создания сделки:{' '}
							<strong>
								<TransformDate orderDate={order?.date_сreate} />
							</strong>
						</div>
					</div>
				</div>

				{!order?.setups?.length && EmptySetup()}
				{order?.setups?.length ? (
					<>
						<div className='group-controll'>
							<ListGroup horizontal>
								<ListGroup.Item variant='light'>
									<Link relative='path' to={`doc-client`}>
										<FaFileLines /> Клиенту
									</Link>
								</ListGroup.Item>
								<ListGroup.Item variant='light'>
									<Link relative='path' to={`doc-workshop`}>
										<FaFileLines /> В цех
									</Link>
								</ListGroup.Item>
								<ListGroup.Item variant='light'>
									<Link relative='path' to={`doc-order`}>
										<FaFileLines /> Заказ
									</Link>
								</ListGroup.Item>
								<ListGroup.Item variant='light'>
									<Link relative='path' to={`doc-painting`}>
										<FaFileLines /> Полимерка
									</Link>
								</ListGroup.Item>
								<ListGroup.Item variant='light'>
									<SendPDFForm orderId={Number(id)} />
								</ListGroup.Item>
							</ListGroup>
							<FormOrderController
								orderData={order}
								updated={updateOrders}
							/>
						</div>

						<DetailList dataOrder={order} />

						{order.metals ? <MetalList metal={order.metals} /> : ''}

						<ProductList
							dataOrder={order}
							delProduct={updateOrders}
						/>

						{/* FIXED INTERFACE ELEMENTS */}
						<div className='fixed-element'>
							<AddDetailSetupModal
								onAdd={updateOrders}
								setups={order.setups}
								order_id={order.id}
							/>
							<CopyOrderModal order={order} />
							<AddSuffixModal
								onAdd={updateOrders}
								order={order}
							/>
							<AddProductModal
								order={order}
								onAdd={updateOrders}
							/>
							<DeleteSetups
								orderId={Number(id)}
								onDel={updateOrders}
							></DeleteSetups>
						</div>
					</>
				) : (
					<div className='fixed-element'>
						<UploadSetupModal
							onCreate={updateOrders}
							orderId={Number(id)}
						/>
						<AddDetailSetupModal
							onAdd={updateOrders}
							setups={order?.setups}
							order_id={order?.id}
						/>
					</div>
				)}
			</div>
		</>
	)
}
