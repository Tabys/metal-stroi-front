import { Table } from "react-bootstrap";
import { Detail, Order } from "../../models";

export function detailList(dataOrder: Order) {
    const arrDetails: Detail[] = []
    dataOrder?.setups?.forEach(element => {
        element.details?.forEach((detail, index) => {
            detail.material = element.material
            detail.work_piece = element?.work_piece?.split('x')[2]
            arrDetails.push(detail)
        })
    });
    console.log(arrDetails)

    // It dont works
    // const groupedArrDetails: Detail[] = [];
    // for(let i = 0; i < arrDetails.length; i++){
    //     const index = groupedArrDetails.findIndex(el => el.name === arrDetails[i].name);
    //     if(index === -1){
    //         groupedArrDetails.push(arrDetails[i]);
    //     }else{
    //         groupedArrDetails[index].quantity += arrDetails[i].quantity;
    //     };
    // };


    // console.log(groupedArrDetails);



    let tdDetail = arrDetails.map((item, index) =>{
        return <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.work_piece}</td>
            <td>{item.material}</td>
            <td>{item.quantity}</td>
            <td>{item.cut_type}</td>
            <td>{item.cut_type}</td>
            <td>{item.cut_count}</td>
            <td>{item.bends_count}</td>
            <td>{item.polymer}</td>
            <td>{item.rolling}</td>
            <td>{item.mec_processing}</td>
            <td>{item.weld_work}</td>
            <td>{item.weld_hardware}</td>
            <td>{item.weld_profit}</td>
            <td>{item.weld_metal}</td>
            <td>{item.weld_other}</td>
            <td>{item.weld_painting}</td>
            <td>{item.weld_install}</td>
            <td>{item.weld_delivery}</td>
            <td>{item.turning_works}</td>
            <td>{item.forge}</td>
        </tr>
    })
    
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
            <tbody>
                { tdDetail }
            </tbody>
        </Table>
    );
}
