import { Order } from '../../../../models'
import { FormMetalList } from './formMetalList'
import styles from './style.module.css'

type metalListProps = {
	order: Order
	updMetal: () => void
}

export function MetalList({ order, updMetal }: metalListProps) {
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

				<FormMetalList metal={order.metals ?? []} markup={order.markup} updMetal={updMetal} />
			</div>
		</div>
	)
}
