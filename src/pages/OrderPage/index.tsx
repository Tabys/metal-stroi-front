import axios, { AxiosError } from "axios"
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { IOrder } from "../../models";
import { Badge, Table } from "react-bootstrap";

export function OrderPage() {
    // Display order information
    const [order, setOrder] = useState<IOrder>()
    const {id} = useParams();
    
    async function getOrder(id: number) {
        try{
            const response = await axios.get<IOrder>(`http://localhost:8080/api/orders/${id}`)
            setOrder(response.data)
            const { data } = response
            console.log({ data })
        } catch (e: unknown) {
            const error = e as AxiosError
        }
    }
    
    useEffect(() =>{
        if(id){
            getOrder(Number(id))
        }
    }, [id])

    // Change type of Badge depends on orderType
    let infType;
    if (order?.orderType === 'deal'){
        infType = <Badge bg="success">Сделка</Badge>
    } else {
        infType = <Badge bg="primary">Лид</Badge>
    }

    // Chcek empty setups
    let setupsObj;
    if (!order?.setups?.length){
        setupsObj = <p>Элементов нету</p>
    } else {
        setupsObj = <p>Элементы есть</p>
    }
    
    
    return (
        <>
            <div className="container">
                <div className="row  g-2">
                    <Link to={`/`}>go back</Link>
                <h1>{order?.title} - id({order?.id}) { infType }</h1>
                <p>{order?.dateCreate}</p>
                </div>
                { setupsObj }
                {order?.setups?.map((setup) => {
                    return <p>{setup?.id}</p>
                })}
            </div>
        </>
    );
}
