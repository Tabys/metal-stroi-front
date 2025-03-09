import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Order } from '../../models'
import Tooltip from '../Tooltip'
import { DelWorkshopProducts } from '../../pages/OrderPage/MKCMXKWorkshop/delWorkshopProducts/DelWorkshopProducts'

type ModalProps = {
	onDel: () => void
	order: Order
}

export function DelWorkshopProductsModal({ onDel, order }: ModalProps) {
	const [showModal, setShowModal] = useState(false)
	const openModal = () => setShowModal(true)
	const closeModal = () => setShowModal(false)

	return (
		<>
			<Tooltip conditions={true} text='Удалить позиции'>
				<Button variant='primary' onClick={openModal}>
					<i className='fi fi-sr-delete-document'></i>
				</Button>
			</Tooltip>

			<Modal show={showModal} onHide={closeModal} dialogClassName='width600'>
				<Modal.Header closeButton>
					<Modal.Title>Удалить позиции</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<DelWorkshopProducts onClose={closeModal} onDel={onDel} order={order} />
				</Modal.Body>
			</Modal>
		</>
	)
}
