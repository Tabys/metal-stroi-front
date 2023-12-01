import { DocTableDetail } from "../../../../models";

type ClientTableProps = {
    details: DocTableDetail
    index: number
}

export function ClientTable({ details, index }: ClientTableProps) {
    const total_price = ((Number(details.bending) + Number(details.choping) + Number(details.cut_cost) + Number(details.metal)) * details.quantity).toFixed(1)

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{details.name}</td>
            <td>{details.thickness}</td>
            <td>{details.quantity}</td>
            <td>{total_price}</td>
        </tr>
    )
}