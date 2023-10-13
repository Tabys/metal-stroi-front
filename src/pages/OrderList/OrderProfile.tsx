import { Link } from 'react-router-dom'
import { Order } from "../../models"
import { TransformDate } from '../../components/TransformDate'

type OrderProps = {
    order: Order
}

export function OrderProfile({ order }: OrderProps) {

    return (
        <div className="col-12 col-sm-6 p-6">
            <div className='p-2 border bg-light d-flex justify-content-between'>
                <Link to={`/order/${order.id}`} className="text-start text-decoration-none text-muted">{order.title}</Link>
                <p className="mb-0"><TransformDate orderDate={order?.date_сreate} /></p>
            </div>
        </div>
    )
}