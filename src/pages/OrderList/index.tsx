import { useState } from 'react'
import { CreateOrder } from "../../components/CreateOrder";
import { Modals } from "../../components/modal/Modals";
import { useOrders } from "../../hooks/orders";
import Button from 'react-bootstrap/Button';
import { ItemListPagination } from './itemListPagination';


export function OrdersPage() {
    const { addOrder } = useOrders()
    const [showOrderModal, setShowOrderModal] = useState(false);

    const openModal = () => setShowOrderModal(true)
    const closeModal = () => setShowOrderModal(false)


    return (
        <>

            <ItemListPagination itemsPerPage={4} />

            <Button className='fixed' variant="primary" onClick={openModal}>
                Добавить заказ
            </Button>

            <Modals title="Добавить сделку" visible={showOrderModal} onClose={closeModal}>
                <CreateOrder onCreate={closeModal} addItem={addOrder} />
            </Modals>
        </>
    );
}
