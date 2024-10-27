import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Order } from '../../models'
import Tooltip from '../Tooltip'
import { CloseButton } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'

type ModalProps = {
	order: Order
	update: () => void
}

export function DelOrderModal({ update, order }: ModalProps) {
	const [showSetupModal, setShowSetupModal] = useState(false)
	const openModal = () => setShowSetupModal(true)
	const closeModal = () => setShowSetupModal(false)

	const { handleSubmit } = useForm<Order>()

	const onSubmit: SubmitHandler<Order> = async () => {
		await axios.delete<Order>(process.env.REACT_APP_BACKEND_API_URL + 'orders/', {
			data: {
				id: order.id,
			},
		})
		await update()
	}

	return (
		<>
			<Tooltip conditions={true} text='Удалить сделку'>
				<div className='custom_close'>
					<CloseButton onClick={openModal} />
				</div>
			</Tooltip>

			<Modal show={showSetupModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Вы уверены, что хотите удалить сделку?</Modal.Title>
				</Modal.Header>
				<Modal.Body className='d-flex justify-content-end'>
					<Button variant='primary' onClick={handleSubmit(onSubmit)} className='mx-2'>
						Удалить
					</Button>
					<Button variant='secondary' onClick={closeModal}>
						Отменить
					</Button>
				</Modal.Body>
			</Modal>
		</>
	)
}
