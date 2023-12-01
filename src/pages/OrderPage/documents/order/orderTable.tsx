import { DocTableDetail } from "../../../../models";

type OrderTableProps = {
    details: DocTableDetail
    index: number
}

export function OrderTable({ details, index }: OrderTableProps) {
    const total_price = ((Number(details.bending) + Number(details.choping) + Number(details.cut_cost) + Number(details.metal)) * details.quantity).toFixed(1)
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{details.name}</td>
            <td>{details.thickness}</td>
            <td>{details.quantity}</td>
            <td>{details.cut_type === 'laser' ? 'Лазер' : 'Плазма'}</td>
            <td>{details.time ? details.time : 0}</td>
            <td>{details.cut_type === 'plasma' && Number(details.thickness) > 16 ? (Number(details.length)).toFixed(3) : 0}</td>
            <td>{details.cut_price}</td>
            <td>{details.cut_type === 'plasma' ? details.cut_count : 0}</td>
            <td>{details.cut_type === 'plasma' ? details.inset_cost : 0}</td>
            <td>{details.cut_cost}</td>
            <td>{details.chop_count ? details.chop_count : 0}</td>
            <td>{details.chop_cost ? details.chop_cost : 0}</td>
            <td>{details.choping}</td>
            <td>{details.bend_count ? details.bend_count : 0}</td>
            <td>{details.bend_cost ? details.bend_cost : 0}</td>
            <td>{details.bending}</td>
            <td>{details.metal}</td>
            <td>{total_price}</td>
        </tr>
    )
}