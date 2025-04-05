import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
// import Tooltip from '../Tooltip'
import { AddNomenclature } from '../../pages/Nomenclature/addNomenclature'

type ModalProps = {
	onAdd: () => void
}

export function AddNomenclatureModal({ onAdd }: ModalProps) {
	const [showSetupModal, setShowSetupModal] = useState(false)
	const openModal = () => setShowSetupModal(true)
	const closeModal = () => setShowSetupModal(false)

	return (
		<>
			{/* <Tooltip conditions={true} text='Добавить позицию'> */}
			<Button variant='primary' onClick={openModal} className='mb-3'>
				Добавить позицию
			</Button>
			{/* </Tooltip> */}

			<Modal show={showSetupModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Добавить позицию</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddNomenclature onClose={closeModal} onCreate={onAdd} />
				</Modal.Body>
			</Modal>
		</>
	)
}
