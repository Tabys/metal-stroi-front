import { Order, TFCTotal } from '../../../../models'
import { AddTfcDetails } from '../AddTfcDetails/AddTfcDetails'
import { TfcControlPanel } from '../TfcControlPanel/TfcControlPanel'
import styles from './style.module.css'
import { TfcTableDetail } from './TfcTableDetail'
import { TfcTotalFooter } from './TfcTotalFooter'

type TfcTableProps = {
	order?: Order
	total: TFCTotal
	onUpdate: () => void
	openAlert: (type: string, massage?: string) => void
}

export function TfcTable({ order, total, onUpdate, openAlert }: TfcTableProps) {
	return (
		<>
			<div className={styles.detail_list + ' ' + styles.bordered + ' ' + styles.border_bold}>
				<div className={styles.row + ' ' + styles.header}>
					<div className={styles.line}>
						<p>№</p>
					</div>
					<div className={styles.line}>
						<p>Наименование детали</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/numbers-min.png' alt='quantity' />
						<p>Количество деталей, шт</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/equipment.png' alt='install' />
						<p>Время наладки, мин</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/milling-machine.png' alt='machine' />
						<p>Инструмент+оснастка, руб</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/help.png' alt='delivery' />
						<p>Работы других цехов</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/tmc.png' alt='other' />
						<p>Прочее, руб</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/lathe-machin.png' alt='machine' />
						<p>Машинное время, мин</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/grinder.png' alt='grinder' />
						<p>Слесарка, руб</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/outsourcing.png' alt='outsourcing' />
						<p>Аутсорс, руб</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/steel.png' alt='material' />
						<p>Материал, руб</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/disruption.png' alt='disruption' />
						<p>Запас на брак, %</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/difficulty-breathing.png' alt='difficulty-breathing' />
						<p>Запас на сложность, %</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/free-icon-money-bag-5584203-min.png' alt='cost' />
						<p>Общая стоимость за 1 шт</p>
					</div>
					<div className={styles.line}></div>
				</div>

				{order && <TfcControlPanel orderData={order} update={onUpdate} openAlert={openAlert} />}

				{order?.tfc_details?.map((detail, index) => (
					<TfcTableDetail detail={detail} total={total} key={detail.id} index={index} onUpdate={onUpdate} openAlert={openAlert} />
				))}

				<AddTfcDetails
					order_id={order?.id}
					onCreate={onUpdate}
					openAlert={openAlert}
					count={order?.tfc_details?.length ? order?.tfc_details?.length : 0}
				/>

				<TfcTotalFooter total={total} />
			</div>
		</>
	)
}
