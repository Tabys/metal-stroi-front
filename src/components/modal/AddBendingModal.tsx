import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
// import Tooltip from '../Tooltip'
import { AddBending } from '../../pages/PriceServices/addBending'

type ModalProps = {
	onAdd: () => void
	categoryId: number
	refetchPrices: () => void
}

export function AddBendingModal({ onAdd, categoryId, refetchPrices }: ModalProps) {
	const [showSetupModal, setShowSetupModal] = useState(false)
	const openModal = () => setShowSetupModal(true)
	const closeModal = () => setShowSetupModal(false)

	return (
		<>
			{/* <Tooltip conditions={true} text='Добавить позицию'> */}
			<Button variant='primary' onClick={openModal} className='mb-3'>
				Добавить толщину
			</Button>
			{/* </Tooltip> */}

			<Modal show={showSetupModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Добавить толщину</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddBending onClose={closeModal} onCreate={onAdd} categoryId={categoryId} refetchPrices={refetchPrices} />
				</Modal.Body>
			</Modal>
		</>
	)
}
