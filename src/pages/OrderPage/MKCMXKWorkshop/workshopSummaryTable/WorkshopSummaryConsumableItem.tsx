import styles from '../workshopProductsTable/style.module.css'
import { WorkshopConsumablesType } from '../../../../models'

type WorkshopSummaryConsumableItemProps = {
	consumable: WorkshopConsumablesType
}

export function WorkshopSummaryConsumableItem({ consumable }: WorkshopSummaryConsumableItemProps) {
	return (
		<form className={styles.tr}>
			<div className={styles.td}>{consumable.name}</div>
			<div className={styles.td}>{consumable.quantity}</div>
		</form>
	)
}
