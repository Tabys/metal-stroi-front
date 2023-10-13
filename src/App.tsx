import { Route, Routes } from "react-router-dom";
import { OrderPage } from "./pages/OrderPage/index";
import { OrdersPage } from "./pages/OrderList/index";
import { Page404 } from "./pages/Page404/index";
import { PriceServices } from "./pages/PriceServices";
import { PriceMaterials } from "./pages/PriceMaterials";
import { DocClient } from "./pages/OrderPage/documents/client/docClient";
import { Header } from "./components/Header";


function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<OrdersPage />} />
                <Route path="/order/:id" element={<OrderPage />} />
                <Route path="/order/:id/doc-client" element={<DocClient />} />
                <Route path="/price-services/" element={<PriceServices />} />
                <Route path="/price-materials/" element={<PriceMaterials />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </>
    )
}

export default App;
