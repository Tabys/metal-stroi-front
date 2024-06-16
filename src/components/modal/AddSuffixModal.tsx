import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Order } from '../../models'
import Tooltip from '../Tooltip'
import { FaRegPenToSquare } from 'react-icons/fa6'
import { AddSuffixes } from '../../pages/OrderPage/addSuffix/addSuffix'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { ChangeMetal } from '../../pages/OrderPage/changeMetal/changeMetal'
import { Alert } from 'react-bootstrap'

type ModalProps = {
	onAdd: () => void
	order: Order
}

export function AddSuffixModal({ onAdd, order }: ModalProps) {
	const [showModal, setShowModal] = useState(false)
	const openModal = () => setShowModal(true)
	const closeModal = () => setShowModal(false)

	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	return (
		<>
			<Tooltip conditions={true} text='Добавить суффиксы'>
				<Button variant='primary' onClick={openModal}>
					<FaRegPenToSquare />
				</Button>
			</Tooltip>

			<Modal
				show={showModal}
				onHide={closeModal}
				dialogClassName='width600'
			>
				<Modal.Header closeButton>
					<Modal.Title>Добавить суффиксы</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Tabs
						defaultActiveKey='suffix'
						id='justify-tab-example'
						className='mb-3'
						justify
					>
						<Tab eventKey='suffix' title='Добавление суффиксов'>
							<AddSuffixes
								onClose={closeModal}
								onCreate={onAdd}
								order={order}
							/>
						</Tab>
						<Tab
							eventKey='metalType'
							title='Изменение типа металла'
						>
							<ChangeMetal
								onChange={onAdd}
								openAlert={openAlert}
								order={order}
							/>
						</Tab>
					</Tabs>
				</Modal.Body>
				<Alert
					className='alert-fixed'
					show={alertShow}
					variant='success'
				>
					Изменения сохранены
				</Alert>
			</Modal>
		</>
	)
}
