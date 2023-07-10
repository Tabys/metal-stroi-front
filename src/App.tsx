import { Route, Routes} from "react-router-dom";
import { OrderPage } from "./pages/OrderPage/index";
import { OrdersPage } from "./pages/OrderList/index";
import { Page404 } from "./pages/Page404/index";


function App() {
    return (
        <Routes>
            <Route path="/" element={ <OrdersPage/> } />
            <Route path="/order/:id" element={ <OrderPage/>} />
            <Route path="*" element={ <Page404/> } />
        </Routes>
    )
}

export default App;
