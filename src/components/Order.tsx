import React, {useState} from 'react'
import { IOrder } from "../models"

interface OrderProps {
    order: IOrder
}
export function Order({ order }: OrderProps) {
    const [details, setDetails] = useState(false)

    const btnClassName = details && 'opdened'
    const btnClassses = ['btn btn-primary', btnClassName]

    return(
        <div className="col-12 col-sm-6 p-6">
            <div className='p-3 border bg-light'>
                <h1>{ order.title }</h1>
                <button className={btnClassses.join(' ')}
                    onClick={() => setDetails(prev => !prev)}
                >
                    {details ? 'Hide Details' : 'Show Details'}
                </button>
                {details && <div>
                    <p>{ order.description }</p>
                </div>}
            </div>
        </div>
    )
}