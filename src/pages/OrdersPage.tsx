import { CreateOrder } from "../components/CreateOrder";
import { ErrorMassage } from "../components/ErrorMassage";
import { Loader } from "../components/Loader";
import { ModalProvider } from "../components/modal/ModalContext";
import { Modals } from "../components/modal/Modals";
import { Order } from "../components/Order";
import { useOrders } from "../hooks/orders";


export function OrdersPage() {
    const {loading, error, orders, addOrder} = useOrders()

    return (
        <>
            {loading && <Loader />}
            {error && <ErrorMassage error={error}/>}
            <div className="container">
                <div className="row  g-2">
                    {orders.map(order => <Order order={order} key={order.id} />).reverse()}
                </div>
            </div>
    
            <ModalProvider>
                <Modals title="Create new order">
                    <CreateOrder onCreate={addOrder}/>
                </Modals>
            </ModalProvider>
        </>
    );
}
