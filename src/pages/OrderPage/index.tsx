import axios, { AxiosError } from "axios"
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Order } from "../../models";
import { Badge } from "react-bootstrap";
import { DetailList } from "./detailList/detailList";
import { UploadSetupModal } from "../../components/modal/UploadSetupModal";
import { DeleteSetups } from "./deleteSetups/deleteSetups";
import { AddDetailModal } from "../../components/modal/AddDetailModal"
import { TransformDate } from "../../components/TransformDate";



export function EmptySetup() {
    return <p>Элементов нет</p>
}

export function OrderPage() {
    // Display order information
    const [order, setOrder] = useState<Order | null>(null)
    const { id } = useParams();


    const updateOrders = () => {
        setTimeout(() => {
            getOrder(Number(id))
        }, 500);
    }

    async function getOrder(id: number) {
        try {
            const response = await axios.get<Order>(`http://localhost:8080/api/orders/${id}`)
            setOrder(response.data)
            // console.log(response.data)
        } catch (e: unknown) {
            const error = e as AxiosError
            console.log({ error })
        }
    }

    useEffect(() => {
        if (id) {
            getOrder(Number(id))
        }
    }, [id])

    return (
        <>
            <div className="container">
                <div className="row  g-2">
                    <Link to={`/`}>Вернуться назад</Link>
                    <h1>{order?.title} <Badge bg="success">Сделка</Badge></h1>
                    <div className="d-flex flex-row">
                        <div className="alert alert-primary p-2" role="alert">
                            ID сделки: <strong>{order?.id}</strong>
                        </div>
                        <div className="alert alert-primary p-2 mx-2" role="alert">
                            Дата создания сделки: <strong><TransformDate orderDate={order?.date_сreate} /></strong>
                        </div>
                    </div>
                </div>

                {!order?.setups?.length && EmptySetup()}

                {order?.setups?.length ?
                    <>
                        <DeleteSetups orderId={Number(id)} onDel={updateOrders}></DeleteSetups>
                        <DetailList dataOrder={order} />
                        <AddDetailModal onAdd={updateOrders} setups={order.setups} />
                        <Link relative="path" to={`doc-client`}>Документ Клиенту</Link>
                    </>
                    :
                    <UploadSetupModal onCreate={updateOrders} orderId={Number(id)} />
                }

            </div>
        </>
    );
}
