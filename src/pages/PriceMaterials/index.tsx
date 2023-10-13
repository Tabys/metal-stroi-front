import { Link } from "react-router-dom";
import { PricesWrapper } from "./PricesWrapper";


export function PriceMaterials() {


    return (
        <>
            <div id="container" className="container">
                <div className="row g-2 mb-3">
                    <Link to={`/`}>На главную</Link>
                    <h1>Цены на материалы</h1>
                </div>
                <PricesWrapper />
            </div>
        </>
    )
}