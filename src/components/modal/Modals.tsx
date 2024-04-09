import Modal from 'react-bootstrap/Modal'

interface ModalProps {
	children: React.ReactNode
	title: string
	visible: boolean
	width?: string
	onClose: () => void
}

export function Modals({
	children,
	title,
	visible,
	width,
	onClose,
}: ModalProps) {
	return (
		<>
			<Modal
				show={visible}
				onHide={onClose}
				dialogClassName={width ? 'width' + width : ''}
			>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{children}</Modal.Body>
			</Modal>
		</>
	)
}
