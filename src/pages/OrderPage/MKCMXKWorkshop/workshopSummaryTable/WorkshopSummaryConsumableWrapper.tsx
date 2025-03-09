import { Order } from '../../../../models'
import styles from '../workshopProductsTable/style.module.css'
import { crateConsumablesGroupList } from './crateConsumablesGroupList'
import { WorkshopSummaryConsumableItem } from './WorkshopSummaryConsumableItem'

type WorkshopSummaryConsumablesWrapperProps = {
	order?: Order
}

export function WorkshopSummaryConsumablesWrapper({ order }: WorkshopSummaryConsumablesWrapperProps) {
	const consumables = crateConsumablesGroupList(order)

	return (
		<>
			<div className={styles.table}>
				<div className={styles.tbody}>
					<div className={styles.tr + ' ' + styles.thead}>
						<div className={styles.td}>Наименование</div>
						<div className={styles.td}>Количество (в ед. изм.)</div>
					</div>

					{consumables.map(consumable => (
						<WorkshopSummaryConsumableItem key={consumable.id} consumable={consumable} />
					))}
				</div>
			</div>
		</>
	)
}
