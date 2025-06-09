import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Order } from '../../models'
import { AddProducts } from '../../pages/OrderPage/LaserWorkshop/addProduct/addProduct'
import Tooltip from '../Tooltip'
import { Alert } from 'react-bootstrap'

type ModalProps = {
	onAdd: () => void
	order: Order
}

export function AddProductModal({ onAdd, order }: ModalProps) {
	const [showSetupModal, setShowSetupModal] = useState(false)
	const [alertShow, setAlertShow] = useState({
		action: false,
		type: 'success',
		message: 'Изменения сохранены',
	})

	const openAlert = (type: string, message?: string) => {
		setAlertShow({
			action: true,
			type: type,
			message: message ?? 'Изменения сохранены',
		})
		setTimeout(() => {
			setAlertShow({
				action: false,
				type: 'type',
				message: message ?? 'Изменения сохранены',
			})
		}, 1500)
	}

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
					<AddProducts onCreate={onAdd} onClose={closeModal} order={order} openAlert={openAlert} />
				</Modal.Body>

				<Alert show={alertShow.action} variant={alertShow.type}>
					{alertShow.message}
				</Alert>
			</Modal>
		</>
	)
}
