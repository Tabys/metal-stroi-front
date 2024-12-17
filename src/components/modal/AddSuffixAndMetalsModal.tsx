import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Order } from '../../models'
import Tooltip from '../Tooltip'
import { AddSuffixesAndMetals } from '../../pages/OrderPage/addSuffixAndMetals/addSuffixAndMetals'
import { Alert } from 'react-bootstrap'

type ModalProps = {
	onAdd: () => void
	order: Order
}

export function AddSuffixModal({ onAdd, order }: ModalProps) {
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
			<Tooltip conditions={true} text='Виды металла'>
				<Button variant='primary' onClick={openModal}>
					<i className='fi fi-sr-layers'></i>
				</Button>
			</Tooltip>

			<Modal show={showModal} onHide={closeModal} dialogClassName='width900'>
				<Modal.Header closeButton>
					<Modal.Title>Виды металла</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddSuffixesAndMetals onClose={openAlert} onCreate={onAdd} order={order} />
				</Modal.Body>
				<Alert className='alert-fixed' show={alertShow} variant='success'>
					Изменения сохранены
				</Alert>
			</Modal>
		</>
	)
}
