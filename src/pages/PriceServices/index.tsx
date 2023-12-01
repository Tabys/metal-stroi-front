import { Link } from "react-router-dom";
import { PricesWrapper } from "./PricesWrapper";

export function PriceServices() {


    return (
        <>
            <div id="container" className="container">
                <div className="row g-2 mb-3">
                    <Link to={`/`} className="back-link">На главную</Link>
                    <h1>Цены на услуги</h1>
                </div>

                <PricesWrapper />
            </div>
        </>
    )
}