import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Order } from '../../models'
import { AddProducts } from '../../pages/OrderPage/LaserWorkshop/addProduct/addProduct'
import Tooltip from '../Tooltip'

type ModalProps = {
	onAdd: () => void
	order: Order
}

export function AddProductModal({ onAdd, order }: ModalProps) {
	const [showSetupModal, setShowSetupModal] = useState(false)
	const openModal = () => setShowSetupModal(true)
	const closeModal = () => setShowSetupModal(false)

	return (
		<>
			<Tooltip conditions={true} text='Добавить изделие'>
				<Button variant='primary' onClick={openModal}>
					<i className='fi fi-sr-apps-add'></i>
				</Button>
			</Tooltip>

			<Modal show={showSetupModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Добавить изделие</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddProducts onCreate={onAdd} onClose={closeModal} order={order} />
				</Modal.Body>
			</Modal>
		</>
	)
}
