import {Route, Routes} from "react-router-dom";
import { OrderPage } from "./pages/OrderPage";
import { OrdersPage } from "./pages/OrdersPage";
import { Page404 } from "./pages/Page404";


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
