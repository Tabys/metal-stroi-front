import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { IOrder } from "../models"


interface OrderProps {
    order: IOrder
}
export function Order({ order }: OrderProps) {
    return(
        <div className="col-12 col-sm-6 p-6">
            <div className='p-2 border bg-light d-flex justify-content-between'>
                <Link to={`/order/${ order.id }`} className="text-start text-decoration-none text-muted">{ order.title }</Link>
                
                <p className='m-0'>{ order.createdAt.split('T')[0] }</p>
            </div>
        </div>
    )
}