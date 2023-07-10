import axios from 'axios'
import React from 'react'
import {useState} from 'react'
import { IOrder } from '../models'
import { ErrorMassage } from './ErrorMassage'


const orderData: IOrder = {
    id: '',
}

interface CreateOrderProps {
    onCreate: (order: IOrder) => void
    addItem: (order: IOrder) => void
}

export function CreateOrder({onCreate, addItem}: CreateOrderProps){
   
    const [valueID, setvalueID] = useState('')
     
    const [error, setError] = useState('')

    const sumbitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')

        orderData.id = valueID

        const response = await axios.post<IOrder>('http://localhost:8080/api/import/', orderData)
        
        
        onCreate(response.data)

        addItem(response.data)
    }

    const changeHandlerID = (event: React.ChangeEvent<HTMLInputElement>) => {
        setvalueID(event.target.value)
    }


    return (
        <form onSubmit={sumbitHandler}>
            <label htmlFor="title" className="form-label">ID Deal or Lead</label>
            <input value={valueID} onChange={changeHandlerID} className="form-control" type="text" name="id" id="id" />
            <button type="submit" className="btn btn-primary container-fluid mt-5">Create</button>
            { error && <ErrorMassage error={error} />}
        </form>
    )
}