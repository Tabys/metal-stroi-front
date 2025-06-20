import { DocTableDetail } from '../../../../../models'
import { findDataInProducts } from './findDataInProduct'
import styles from '../style.module.css'

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
			<td className={styles.center}>{index + 1}</td>
			<td className={styles.left + ' ' + (detail.free ? styles.free : '')}>
				{detail.name} {detail.free ? ' (OZON)' : ''}
			</td>
			<td className={styles.center}>
				{detail.thickness} {detail.material} {detail.suffixes} {detail.customers_metal ? 'зак' : ''}
			</td>
			<td className={styles.center}>{detail.quantity}</td>
			{work_types?.find(work_type => work_type === 77 || work_type === 81) ? (
				<td>{detail.cut_type === 'laser' ? 'Лазер' : detail.cut_type === 'plasma' ? 'Плазма' : '-'}</td>
			) : (
				<td>-</td>
			)}
			{work_types?.find(work_type => work_type === 79) ? <td>{detail.chop_count ? detail.chop_count : ''}</td> : ''}
			{work_types?.find(work_type => work_type === 78) ? <td>{detail.bend_count ? detail.bend_count : ''}</td> : ''}
			{work_types?.find(work_type => work_type === 80) ? <td className={styles.center}>{detail.rolling ? '✓' : ''}</td> : ''}
			{work_types?.find(work_type => work_type === 82) ? (
				<td className={styles.center}>{dataProducts.painting > 0 || Number(detail.polymer_price) > 0 ? '✓' : ''}</td>
			) : (
				''
			)}
			{work_types?.find(work_type => work_type === 87) ? <td className={styles.center}>{dataProducts.smithy > 0 ? '✓' : ''}</td> : ''}
			{work_types?.find(work_type => work_type === 89) ? <td className={styles.center}>{dataProducts.turning_works > 0 ? '✓' : ''}</td> : ''}
		</tr>
	)
}
