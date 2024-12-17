import { useState } from 'react'
import { CreateOrder } from '../../components/CreateOrder'
import { Modals } from '../../components/modal/Modals'
import Button from 'react-bootstrap/Button'
import { ItemListPagination } from './itemListPagination'
import Tooltip from '../../components/Tooltip'
import { Order } from '../../models'
import { useNavigate } from 'react-router-dom'

export function OrdersPage() {
	const navigate = useNavigate()
	const [showOrderModal, setShowOrderModal] = useState(false)

	const openModal = () => setShowOrderModal(true)
	const closeModal = () => setShowOrderModal(false)

	function addOrder(order: Order) {
		navigate(`/order/${order.id}`)
	}

	return (
		<>
			<ItemListPagination itemsPerPage={20} />

			<div className='fixed-element'>
				<Tooltip conditions={true} text='Добавить просчёт'>
					<Button variant='primary' onClick={openModal}>
						<i className='fi fi-sr-plus'></i>
					</Button>
				</Tooltip>

				<Modals title='Добавить просчёт' visible={showOrderModal} onClose={closeModal}>
					<CreateOrder onCreate={closeModal} addItem={addOrder} />
				</Modals>
			</div>
		</>
	)
}
