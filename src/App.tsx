import { ErrorMassage } from "./components/ErrorMassage";
import { Loader } from "./components/Loader";
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
        </>
    );
}

export default App;
