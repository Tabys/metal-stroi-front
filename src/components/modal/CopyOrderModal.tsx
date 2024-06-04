import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Order } from '../../models'
import Tooltip from '../Tooltip'
import { FaRegClone } from 'react-icons/fa6'
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
			<Tooltip conditions={true} text='Клонирование сделки'>
				<Button variant='primary' onClick={openModal}>
					<FaRegClone />
				</Button>
			</Tooltip>

			<Modal
				show={showModal}
				onHide={closeModal}
				dialogClassName='width700'
			>
				<Modal.Header closeButton>
					<Modal.Title>Клонирование сделки</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CopyOrderData orderID={order.id} onClose={closeModal} />
				</Modal.Body>
			</Modal>
		</>
	)
}
