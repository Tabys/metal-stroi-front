import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Tooltip from '../Tooltip'
import { AddWorkshopProduct } from '../../pages/OrderPage/MKCMXKWorkshop/addWorkshopProduct/addWorkshopProduct'

type ModalProps = {
	onAdd: () => void
	order_id?: number
}

export function AddWorkshopProductModal({ onAdd, order_id }: ModalProps) {
	const [showSetupModal, setShowSetupModal] = useState(false)
	const openModal = () => setShowSetupModal(true)
	const closeModal = () => setShowSetupModal(false)

	return (
		<>
			<Tooltip conditions={true} text='Добавить позицию'>
				<Button className='fixed right-175' variant='primary' onClick={openModal}>
					<i className='fi fi-sr-picking'></i>
				</Button>
			</Tooltip>

			<Modal show={showSetupModal} onHide={closeModal} dialogClassName='width600'>
				<Modal.Header closeButton>
					<Modal.Title>Добавление позиции</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddWorkshopProduct onCreate={onAdd} onClose={closeModal} order_id={order_id} />
				</Modal.Body>
			</Modal>
		</>
	)
}
