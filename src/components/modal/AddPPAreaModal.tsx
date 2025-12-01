import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
// import Tooltip from '../Tooltip'
import { AddPPArea } from '../../pages/PriceServices/addPPArea'

type ModalProps = {
	onAdd: () => void
	categoryId: number
	refetchPrices: () => void
}

export function AddPPAreaModal({ onAdd, categoryId, refetchPrices }: ModalProps) {
	const [showSetupModal, setShowSetupModal] = useState(false)
	const openModal = () => setShowSetupModal(true)
	const closeModal = () => setShowSetupModal(false)

	return (
		<>
			{/* <Tooltip conditions={true} text='Добавить позицию'> */}
			<Button variant='primary' onClick={openModal} className='mb-3'>
				Добавить новую площадь
			</Button>
			{/* </Tooltip> */}

			<Modal show={showSetupModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Добавить новую площадь</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddPPArea onClose={closeModal} onCreate={onAdd} categoryId={categoryId} refetchPrices={refetchPrices} />
				</Modal.Body>
			</Modal>
		</>
	)
}
