import axios, { AxiosError } from "axios"
import React, { useEffect, useState } from 'react';
import { IOrder } from "../models"

export function useOrders(){
    const [orders, setOrders] = useState<IOrder[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchOrders() {
        try{
            setError('')
            setLoading(true)
            const response = await axios.get<IOrder[]>('http://192.168.3.9:8080/api/orders')
            setOrders(response.data)
            console.log(setOrders)
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

    return { orders, error, loading}
}