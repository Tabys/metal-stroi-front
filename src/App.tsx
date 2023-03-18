import { useState } from "react";
import { CreateOrder } from "./components/CreateOrder";
import { ErrorMassage } from "./components/ErrorMassage";
import { Loader } from "./components/Loader";
import { ModalProvider } from "./components/modal/ModalContext";
import { Modals } from "./components/modal/Modals";
import { Order } from "./components/Order";
import { useOrders } from "./hooks/orders";


function App() {
    const {loading, error, orders} = useOrders()


    return (
        <>
            {loading && <Loader />}
            {error && <ErrorMassage error={error}/>}
            <div className="container text-center">
                <div className="row  g-2">
                    {orders.map(order => <Order order={order} key={order.id} />)}
                </div>
            </div>
    
            <ModalProvider>
                <Modals title="Create new order">
                    <CreateOrder />
                </Modals>
            </ModalProvider>
        </>
    );
}

export default App;
