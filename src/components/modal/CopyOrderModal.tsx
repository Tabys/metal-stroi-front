import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Order } from '../../models'
import Tooltip from '../Tooltip'
import { CopyOrderData } from '../../pages/OrderPage/orderController/copyOrderData'

type ModalProps = {
	order: Order
}

export function CopyOrderModal({ order }: ModalProps) {
	const [showModal, setShowModal] = useState(false)
	const openModal = () => setShowModal(true)
	const closeModal = () => setShowModal(false)

	return (
		<>
			<Tooltip conditions={true} text='Клонирование просчёта'>
				<Button variant='primary' onClick={openModal}>
					<i className='fi fi-sr-duplicate'></i>
				</Button>
			</Tooltip>

			<Modal show={showModal} onHide={closeModal} dialogClassName='width700'>
				<Modal.Header closeButton>
					<Modal.Title>Клонирование просчёта</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CopyOrderData orderID={order.id} onClose={closeModal} />
				</Modal.Body>
			</Modal>
		</>
	)
}
