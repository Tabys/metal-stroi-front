import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
// import Tooltip from '../Tooltip'
import { AddPPMod } from '../../pages/PriceServices/addPPMod'

type ModalProps = {
	onAdd: () => void
	categoryId: number
	refetchPrices: () => void
}

export function AddPPModModal({ onAdd, categoryId, refetchPrices }: ModalProps) {
	const [showSetupModal, setShowSetupModal] = useState(false)
	const openModal = () => setShowSetupModal(true)
	const closeModal = () => setShowSetupModal(false)

	return (
		<>
			{/* <Tooltip conditions={true} text='Добавить позицию'> */}
			<Button variant='primary' onClick={openModal} className='mb-3'>
				Добавить опцию ПП
			</Button>
			{/* </Tooltip> */}

			<Modal show={showSetupModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Добавить опцию ПП</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddPPMod onClose={closeModal} onCreate={onAdd} categoryId={categoryId} refetchPrices={refetchPrices} />
				</Modal.Body>
			</Modal>
		</>
	)
}
