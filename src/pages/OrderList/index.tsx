import React, {useState, useEffect} from 'react'
import { CreateOrder } from "../../components/CreateOrder";
import { ErrorMassage } from "../../components/ErrorMassage";
import { Loader } from "../../components/Loader";
import { Modals } from "../../components/modal/Modals";
import { Order } from "../../components/Order";
import { useOrders } from "../../hooks/orders";
import Button from 'react-bootstrap/Button';


export function OrdersPage() {
    const {loading, error, orders, addOrder} = useOrders()
    const [showOrderModal, setShowOrderModal] = useState(false);

    const openModal = () => setShowOrderModal(true)
    const closeModal = () => setShowOrderModal(false)
         
    
    return (
        <>
            {loading && <Loader />}
            {error && <ErrorMassage error={error}/>}
            <div className="container">
                <div className="row  g-2">
                    {orders.map(order => <Order order={order} key={order.id} />).reverse()}
                </div>
            </div>
    
            <Button className='fixed' variant="primary" onClick={openModal}>
                Add new order
            </Button>

            <Modals title="Create new order" visible={showOrderModal} onClose={closeModal}>
                <CreateOrder onCreate={closeModal} addItem={addOrder}/>
            </Modals>
        </>
    );
}
