import React, {useState, useContext} from 'react'
import { Modal } from '../../models'

const ModalContext = React.createContext<Modal>({})

export const useModal = () => {
    return useContext(ModalContext)
}

export const ModalProvider = ({ children }: {children: React.ReactNode}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <ModalContext.Provider value={{
            visible: show,
            handleClose,
            handleShow
        }}>
            { children }
        </ModalContext.Provider>
    )
}