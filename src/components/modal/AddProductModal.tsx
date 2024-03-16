import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Order } from '../../models'
import { AddProducts } from '../../pages/OrderPage/addProduct/addProduct'

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
			<Button
				className='fixed right-175'
				variant='primary'
				onClick={openModal}
			>
				Добавить изделие
			</Button>

			<Modal show={showSetupModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Добавить изделие</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddProducts
						onCreate={onAdd}
						onClose={closeModal}
						order={order}
					/>
				</Modal.Body>
			</Modal>
		</>
	)
}
