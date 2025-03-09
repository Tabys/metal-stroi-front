import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { UploadSetups } from '../../pages/OrderPage/LaserWorkshop/uploadSetups/uploadSetups'
import Tooltip from '../Tooltip'

type ModalProps = {
	onCreate: () => void
	orderId: number
}

export function UploadSetupModal({ onCreate, orderId }: ModalProps) {
	const [showSetupModal, setShowSetupModal] = useState(false)
	const openModal = () => setShowSetupModal(true)
	const closeModal = () => setShowSetupModal(false)

	return (
		<>
			<Tooltip conditions={true} text='Добавить сетапы'>
				<Button className='fixed' variant='primary' onClick={openModal}>
					<i className='fi fi-sr-add-document'></i>
				</Button>
			</Tooltip>

			<Modal show={showSetupModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Добавить сетапы</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UploadSetups orderId={orderId} onCreate={onCreate} closeModal={closeModal}></UploadSetups>
				</Modal.Body>
			</Modal>
		</>
	)
}
