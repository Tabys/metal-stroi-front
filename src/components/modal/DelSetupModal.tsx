import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Order } from '../../models'
import Tooltip from '../Tooltip'
import { FaRegTrashCan } from 'react-icons/fa6'
import { Alert } from 'react-bootstrap'
import { DelSetups } from '../../pages/OrderPage/delSetups/delSetups'

type ModalProps = {
	onDel: () => void
	order: Order
}

export function DelSetupModal({ onDel, order }: ModalProps) {
	const [showModal, setShowModal] = useState(false)
	const openModal = () => setShowModal(true)
	const closeModal = () => setShowModal(false)

	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	return (
		<>
			<Tooltip conditions={true} text='Удалить сетапы'>
				<Button variant='primary' onClick={openModal}>
					<FaRegTrashCan />
				</Button>
			</Tooltip>

			<Modal
				show={showModal}
				onHide={closeModal}
				dialogClassName='width600'
			>
				<Modal.Header closeButton>
					<Modal.Title>Удалить сетапы</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<DelSetups
						onClose={closeModal}
						onDel={onDel}
						order={order}
					/>
				</Modal.Body>
				<Alert
					className='alert-fixed'
					show={alertShow}
					variant='success'
				>
					Изменения сохранены
				</Alert>
			</Modal>
		</>
	)
}
