import axios, { AxiosError } from "axios"
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Order } from "../../models";
import { Badge } from "react-bootstrap";
import { detailList } from "./detailList";
import Button from 'react-bootstrap/Button';
import { Modals } from "../../components/modal/Modals";
import { UploadSetups } from "./uploadSetups/uploadSetups";


export function EmptySetup() {
    return <p>Элементов нет</p>
}

export function OrderPage() {
    const [showOrderModal, setShowOrderModal] = useState(false);
    const openModal = () => setShowOrderModal(true)
    const closeModal = () => setShowOrderModal(false)

    // Display order information
    const [order, setOrder] = useState<Order>()
    const {id} = useParams();
    
    async function getOrder(id: number) {
        try{
            const response = await axios.get<Order>(`http://localhost:8080/api/orders/${id}`)
            setOrder(response.data)

            console.log( response )
        } catch (e: unknown) {
            const error = e as AxiosError
            console.log(error);
        }
    }
    
    useEffect(() =>{
        if(id){
            getOrder(Number(id))
        }
    }, [id])

      
    return (
        <>
            <div className="container">
                <div className="row  g-2">
                    <Link to={`/`}>go back</Link>
                    <h1>{order?.title} - id({order?.id}) { order?.orderType === 'deal' ?  <Badge bg="success">Сделка</Badge> : <Badge bg="primary">Лид</Badge>}</h1>
                    <p>{order?.dateCreate}</p>
                </div>

                {!order?.setups?.length && EmptySetup()}

                {order?.setups?.length ? detailList(order) : <Button className='fixed' variant="primary" onClick={openModal}>Загрузить сетапы</Button>}

            
                <Modals title="Загрузить сетапы" visible={showOrderModal} onClose={closeModal}>
                    <UploadSetups orderId={String(order?.id)} onCreate={closeModal}></UploadSetups>
                </Modals>

            </div>
        </>
    );
}
