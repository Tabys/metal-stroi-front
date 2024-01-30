import Modal from 'react-bootstrap/Modal'

interface ModalProps {
	children: React.ReactNode
	title: string
	visible: boolean
	onClose: () => void
}

export function Modals({ children, title, visible, onClose }: ModalProps) {
	return (
		<>
			<Modal show={visible} onHide={onClose}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{children}</Modal.Body>
			</Modal>
		</>
	)
}
