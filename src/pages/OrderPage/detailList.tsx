import axios, { AxiosError } from "axios"
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { IOrder } from "../../models";
import { Badge, Table } from "react-bootstrap";

export function detailList() {
    // Display detail information
    const [detail, setDetail] = useState<IOrder>()
    const {id} = useParams();
    
    async function getDetails() {
        try{
            const response = await axios.get<IOrder>(`http://localhost:8080/api/orders/${id}`)
            setDetail(response.data)
            console.log(`Respons.Data -  ${response.data}`)
        } catch (e: unknown) {
            const error = e as AxiosError
        }
    }
    
    useEffect(() =>{
        getDetails()
        console.log('Details - ', {detail})
    }, [])

    
    
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th rowSpan={2}>№</th>
                    <th rowSpan={2}>Наименование изделия</th>
                    <th rowSpan={2}>Толщина металла, мм</th>
                    <th rowSpan={2}>Материал</th>
                    <th rowSpan={2}>Кол-во изделий, шт</th>
                    <th rowSpan={2}>Лазер (опция)</th>
                    <th rowSpan={2}>Плазма (опция)</th>
                    <th rowSpan={2}>Кол-во рубов</th>
                    <th rowSpan={2}>Кол-во гибов</th>
                    <th rowSpan={2}>Полимерка (опция)</th>
                    <th rowSpan={2}>Вальцовка</th>
                    <th rowSpan={2}>Механическая обработка</th>
                    <th colSpan={8}>Сварка</th>
                    <th rowSpan={2}>Токарные работы</th>
                    <th rowSpan={2}>Кузня</th>
                </tr>
                <tr>
                    <th>Работа</th>
                    <th>Метизы</th>
                    <th>Прибыль</th>
                    <th>Металл</th>
                    <th>Прочее</th>
                    <th>Покраска</th>
                    <th>Монтаж</th>
                    <th>Доставка</th>
                </tr>
            </thead>
        </Table>
    );
}
