import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { UploadSetups } from '../../pages/OrderPage/uploadSetups/uploadSetups'
import { FaFileArrowDown } from 'react-icons/fa6'
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
			<Tooltip conditions={true} text='Загрузить сетапы'>
				<Button className='fixed' variant='primary' onClick={openModal}>
					<FaFileArrowDown />
				</Button>
			</Tooltip>

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
