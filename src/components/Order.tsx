import {Link} from 'react-router-dom'
import { Order } from "../models"

type OrderProps = {
    order: Order
}

type DateNull = Date | null
type StringNull = string | null

export function OrderProfile({ order }: OrderProps) {
    let infType;
    const date: DateNull = order?.dateCreate ? new Date(order.dateCreate) : null;
    const customDate: StringNull = date ? ('0' + date.getDate()).slice(-2) + '.' + ('0' + date.getMonth()).slice(-2) + '.' + date.getFullYear() : null;

    if (order.orderType === 'deal'){
       infType = <p className='text-success'>{order.orderType}</p>
    } else {
       infType = <p className='text-primary'>{order.orderType}</p>
    }

    return(
        <div className="col-12 col-sm-6 p-6">
            <div className='p-2 border bg-light d-flex justify-content-between'>
                <Link to={`/order/${ order.id }`} className="text-start text-decoration-none text-muted">{ order.title }</Link>
                {infType}   
                {customDate && <p className='m-0'>{ customDate }</p>}
            </div>
        </div>
    )
}