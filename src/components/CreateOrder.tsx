import axios from 'axios'
import React from 'react'
import Ract, {useState, KeyboardEvent, useContext} from 'react'
import { IOrder } from '../models'
import { ErrorMassage } from './ErrorMassage'
import { useModal } from './modal/ModalContext'


const orderData: IOrder = {
    title: '',
    description: '',
    published: true
}

export function CreateOrder(){
    const show = useModal()

    const [valueTitle, setValueTitle] = useState('')
    
    const [valueDes, setValueDes] = useState('')
    
    const [error, setError] = useState('')

    const sumbitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')

        if (valueTitle.trim().length === 0){
            setError('Please enter valid title.')
            return
        }
        if (valueDes.trim().length === 0){
            setError('Please enter valid description.')
            return
        }

        orderData.title = valueTitle
        orderData.description = valueDes

        const response = await axios.post<IOrder>('http://localhost:8080/api/orders/', orderData)
        
        {show.handleClose()}
    }

    const changeHandlerTitle = (event: any) => {
        setValueTitle(event.target.value)
    }
    const changeHandlerDes = (event: any) => {
        setValueDes(event.target.value)
    }

    return (
        <form onSubmit={sumbitHandler}>
            <label htmlFor="title" className="form-label">Title</label>
            <input value={valueTitle} onChange={changeHandlerTitle} className="form-control" type="text" name="title" id="title" />
            <label htmlFor="text" className="form-label mt-3">Description</label>
            <textarea value={valueDes} className="form-control" onChange={changeHandlerDes} name="description" id="text"></textarea>
            <button type="submit" className="btn btn-primary container-fluid mt-5">Create</button>
            { error && <ErrorMassage error={error} />}
        </form>
    )
}