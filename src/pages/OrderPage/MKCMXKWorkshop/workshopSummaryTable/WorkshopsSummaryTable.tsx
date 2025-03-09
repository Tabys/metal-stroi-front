import { Order } from '../../../../models'
import styles from './../workshopProductsTable/style.module.css'
import { WorkshopSummaryConsumablesWrapper } from './WorkshopSummaryConsumableWrapper'
import { WorkshopSummaryMaterialWrapper } from './WorkshopSummaryMaterialWrapper'

type WorkshopSummaryTableProps = {
	order?: Order
	onCreate: () => void
	openAlert: (type: string, massage?: string) => void
}

export function WorkshopSummaryTable({ order, onCreate, openAlert }: WorkshopSummaryTableProps) {
	return (
		<>
			<div className={styles.flex + ' ' + styles.summary}>
				<div className={styles.group + ' ' + styles.green}>
					<div className={styles.box}>
						<p className={styles.title}>Сводная таблица материала</p>
					</div>
					<WorkshopSummaryMaterialWrapper order={order} onCreate={onCreate} openAlert={openAlert} />
				</div>
				<div className={styles.group + ' ' + styles.green}>
					<div className={styles.box}>
						<p className={styles.title}>Сводная таблица ТМЦ</p>
					</div>
					<WorkshopSummaryConsumablesWrapper order={order} />
				</div>
			</div>
		</>
	)
}
