import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { AddDetail } from '../../pages/OrderPage/addDetail/addDetail'
import { Setup } from '../../models'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { Tab, Tabs } from 'react-bootstrap'
import { AddSetup } from '../../pages/OrderPage/addSetup/addSetup'
import Tooltip from '../Tooltip'

type ModalProps = {
	onAdd: () => void
	setups?: Setup[]
	order_id?: number
}

export function AddDetailSetupModal({ onAdd, setups, order_id }: ModalProps) {
	const [showSetupModal, setShowSetupModal] = useState(false)
	const openModal = () => setShowSetupModal(true)
	const closeModal = () => setShowSetupModal(false)

	return (
		<>
			<Tooltip conditions={true} text='Добавить сетап с деталями вручную'>
				<Button
					className='fixed right-175'
					variant='primary'
					onClick={openModal}
				>
					<FaRegSquarePlus />
				</Button>
			</Tooltip>

			<Modal
				show={showSetupModal}
				onHide={closeModal}
				dialogClassName='width600'
			>
				<Modal.Header closeButton>
					<Modal.Title>Добавить сетап с деталями</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddSetup
						onCreate={onAdd}
						onClose={closeModal}
						order_id={order_id}
					/>
				</Modal.Body>
			</Modal>
		</>
	)
}
