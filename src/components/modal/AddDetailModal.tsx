import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddDetail } from "../../pages/OrderPage/addDetail/addDetail";
import { Setup } from '../../models'

type ModalProps = {
    onAdd: () => void
    setups: Setup[]
}

export function AddDetailModal({ onAdd, setups }: ModalProps) {

    const [showSetupModal, setShowSetupModal] = useState(false);
    const openModal = () => setShowSetupModal(true)
    const closeModal = () => setShowSetupModal(false)


    return (
        <>
            <Button className='fixed right-175' variant="primary" onClick={openModal}>Добавить деталь</Button>

            <Modal show={showSetupModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить деталь</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddDetail onCreate={onAdd} onClose={closeModal} setups={setups} />
                </Modal.Body>
            </Modal>
        </>
    )
}
