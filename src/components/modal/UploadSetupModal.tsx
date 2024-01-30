import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { UploadSetups } from '../../pages/OrderPage/uploadSetups/uploadSetups'

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
			<Button className='fixed' variant='primary' onClick={openModal}>
				Загрузить сетапы
			</Button>

			<Modal show={showSetupModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Загрузить сетапы</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UploadSetups
						orderId={orderId}
						onCreate={onCreate}
						closeModal={closeModal}
					></UploadSetups>
				</Modal.Body>
			</Modal>
		</>
	)
}
