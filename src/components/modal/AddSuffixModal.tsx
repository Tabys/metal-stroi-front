import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Order } from '../../models'
import Tooltip from '../Tooltip'
import { FaRegPenToSquare } from 'react-icons/fa6'
import { AddSuffixes } from '../../pages/OrderPage/addSuffix/addSuffix'

type ModalProps = {
	onAdd: () => void
	order: Order
}

export function AddSuffixModal({ onAdd, order }: ModalProps) {
	const [showModal, setShowModal] = useState(false)
	const openModal = () => setShowModal(true)
	const closeModal = () => setShowModal(false)

	return (
		<>
			<Tooltip conditions={true} text='Добавить суффиксы'>
				<Button variant='primary' onClick={openModal}>
					<FaRegPenToSquare />
				</Button>
			</Tooltip>

			<Modal
				show={showModal}
				onHide={closeModal}
				dialogClassName='width600'
			>
				<Modal.Header closeButton>
					<Modal.Title>Добавить суффиксы</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddSuffixes
						onClose={closeModal}
						onCreate={onAdd}
						order={order}
					/>
				</Modal.Body>
			</Modal>
		</>
	)
}
