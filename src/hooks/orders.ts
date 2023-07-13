import axios, { AxiosError } from "axios"
import { useEffect, useState } from 'react';
import { Order } from "../models"
import { useNavigate } from "react-router-dom";


export function useOrders(){
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate();

    function addOrder(order: Order){
        navigate(`/order/${order.id}`);
    }

    async function fetchOrders() {
        try{
            setError('')
            setLoading(true)
            const response = await axios.get<Order[]>('http://localhost:8080/api/orders')
            setOrders(response.data)
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() =>{
        fetchOrders()
    }, [])

    return { orders, error, loading, addOrder}
}