import { DocTableDetail } from '../../../../models'
import { findDataInProducts } from './findDataInProduct'

type WHTableProps = {
	detail: DocTableDetail
	work_types: number[] | undefined
	index: number
}

export function WorkshopTable({ detail, work_types, index }: WHTableProps) {
	// const total_price = ((Number(detail.bending) + Number(detail.choping) + Number(detail.cut_cost) + Number(detail.metal)) * detail.quantity).toFixed(1)
	const dataProducts = findDataInProducts({ detail })

	return (
		<tr>
			<td>{index + 1}</td>
			<td>{detail.name}</td>
			<td>
				{detail.thickness} {detail.material} {detail.suffixes} {detail.customers_metal ? 'зак' : ''}
			</td>
			<td>{detail.quantity}</td>
			{work_types?.find(work_type => work_type === 246 || work_type === 254) ? <td>{detail.cut_type === 'laser' ? 'Лазер' : 'Плазма'}</td> : ''}
			{work_types?.find(work_type => work_type === 250) ? <td>{detail.chop_count ? detail.chop_count : ''}</td> : ''}
			{work_types?.find(work_type => work_type === 248) ? <td>{detail.bend_count ? detail.bend_count : ''}</td> : ''}
			{work_types?.find(work_type => work_type === 252) ? <td>{detail.rolling ? '✓' : ''}</td> : ''}
			{work_types?.find(work_type => work_type === 330 || work_type === 478) ? <td>{dataProducts.weldings > 0 ? '✓' : ''}</td> : ''}
			{work_types?.find(work_type => work_type === 320) ? <td>{dataProducts.painting > 0 || Number(detail.polymer_price) > 0 ? '✓' : ''}</td> : ''}
			{work_types?.find(work_type => work_type === 458) ? <td>{dataProducts.smithy > 0 ? '✓' : ''}</td> : ''}
			{work_types?.find(work_type => work_type === 470) ? <td>{dataProducts.turning_works > 0 ? '✓' : ''}</td> : ''}
		</tr>
	)
}
