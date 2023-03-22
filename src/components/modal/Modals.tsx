import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useModal } from './ModalContext';


interface ModalProps{
    children: React.ReactNode
    title: string
}

export function Modals({children, title}: ModalProps) {
    const show = useModal()

    
    return (
        <>
            <Button className='fixed' variant="primary" onClick={show.handleShow}>
                Add new order
            </Button>

            <Modal show={show.visible} onHide={show.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{ title }</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ children }</Modal.Body>
            </Modal>
        </>
    )
}