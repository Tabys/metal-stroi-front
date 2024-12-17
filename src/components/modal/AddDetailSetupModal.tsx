import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Setup } from '../../models'
import { AddSetupChoping } from '../../pages/OrderPage/addSetup/addSetupChoping'
import Tooltip from '../Tooltip'
import { Tab, Tabs } from 'react-bootstrap'
import { AddSetupBending } from '../../pages/OrderPage/addSetup/addSetupBending'

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
			<Tooltip conditions={true} text='Ручное добавление деталей'>
				<Button className='fixed right-175' variant='primary' onClick={openModal}>
					<i className='fi fi-sr-picking'></i>
				</Button>
			</Tooltip>

			<Modal show={showSetupModal} onHide={closeModal} dialogClassName='width600'>
				<Modal.Header closeButton>
					<Modal.Title>Ручное добавление деталей</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Tabs defaultActiveKey='choping' className='mb-3'>
						<Tab eventKey='choping' title='Рубка'>
							<AddSetupChoping onCreate={onAdd} onClose={closeModal} order_id={order_id} />
						</Tab>
						<Tab eventKey='bending' title='Гибка'>
							<AddSetupBending onCreate={onAdd} onClose={closeModal} order_id={order_id} />
						</Tab>
					</Tabs>
				</Modal.Body>
			</Modal>
		</>
	)
}
