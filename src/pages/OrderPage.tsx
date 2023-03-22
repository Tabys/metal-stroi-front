import axios, { AxiosError } from "axios"
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { IOrder } from "../models";

export function OrderPage() {
    const [order, setOrder] = useState<IOrder>()
    const {id} = useParams();

    async function getOrder() {
        try{
            const response = await axios.get<IOrder>(`http://192.168.3.9:8080/api/orders/${id}`)
            setOrder(response.data)
        } catch (e: unknown) {
            const error = e as AxiosError
        }
    }
    
        
    useEffect(() =>{
        getOrder()
    }, [])
    
    console.log(order)
    return (
        <div className="container">
            <div className="row  g-2">
                <Link to={`/`}>go back</Link>
               <h1>{order?.title} - id({order?.id})</h1>
               <p>{order?.description}</p>
               <p>{order?.createdAt}</p>
            </div>
        </div>
    );
}
