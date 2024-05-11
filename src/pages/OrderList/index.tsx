import { useState } from 'react'
import { CreateOrder } from '../../components/CreateOrder'
import { Modals } from '../../components/modal/Modals'
import { useOrders } from '../../hooks/orders'
import Button from 'react-bootstrap/Button'
import { ItemListPagination } from './itemListPagination'
import { FaPlus } from 'react-icons/fa6'
import Tooltip from '../../components/Tooltip'

export function OrdersPage() {
	const { addOrder } = useOrders()
	const [showOrderModal, setShowOrderModal] = useState(false)

	const openModal = () => setShowOrderModal(true)
	const closeModal = () => setShowOrderModal(false)

	return (
		<>
			<ItemListPagination itemsPerPage={20} />
			<div className='fixed-element'>
				<Tooltip conditions={true} text='Добавить сделку'>
					<Button variant='primary' onClick={openModal}>
						<FaPlus />
					</Button>
				</Tooltip>

				<Modals
					title='Добавить сделку'
					visible={showOrderModal}
					onClose={closeModal}
				>
					<CreateOrder onCreate={closeModal} addItem={addOrder} />
				</Modals>
			</div>
		</>
	)
}
