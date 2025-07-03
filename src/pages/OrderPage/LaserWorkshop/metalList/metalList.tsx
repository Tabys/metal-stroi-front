import { Order } from '../../../../models'
import { FormMetalList } from './formMetalList'
import styles from './style.module.css'
import { useWorkPiece } from '../../../../hooks/useWorkPiece'

type metalListProps = {
	order: Order
	updMetal: () => void
}

export function MetalList({ order, updMetal }: metalListProps) {
	const { workPiece } = useWorkPiece()

	return (
		<div className={styles.wrapper_table + ' ' + styles.metal_table}>
			<h2>Металл</h2>
			<div className={styles.detail_list}>
				<div className={styles.row + ' ' + styles.header}>
					<div>Толщина</div>
					<div>Ширина</div>
					<div>Длина</div>
					<div>Листы</div>
					<div>Стоимость</div>
					<div>Актуализировать листы</div>
					<div>Округлить листы</div>
				</div>

				<FormMetalList workPiece={workPiece} metal={order.metals ?? []} markup={order.markup} updMetal={updMetal} />
			</div>
		</div>
	)
}
