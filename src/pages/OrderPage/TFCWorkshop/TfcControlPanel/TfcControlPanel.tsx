import styles from '../TfcTable/style.module.css'
import { Order } from '../../../../models'
import { UniversalReset } from '../../LaserWorkshop/detailList/component/controlPanel/reset/UniversalReset'
import { UniversalChange } from './UniversalChange'

type TfcControlPanelProps = {
	orderData: Order
	update: () => void
	openAlert: (type: string, message?: string) => void
}

export function TfcControlPanel({ orderData, update, openAlert }: TfcControlPanelProps) {
	return (
		<>
			<div className={styles.row + ' ' + styles.controll_panel}>
				<div className={styles.line}></div>
				<div className={styles.line}></div>
				<div className={styles.line}></div>

				<div className={styles.line + ' ' + styles.orange}>
					<UniversalReset update={update} orderId={orderData.id} APIObject='tfc-details' openAlert={openAlert} condition={{ setup_time: 0 }} />
				</div>
				<div className={styles.line + ' ' + styles.orange}>
					<UniversalReset update={update} orderId={orderData.id} APIObject='tfc-details' openAlert={openAlert} condition={{ tools: 0 }} />
				</div>
				<div className={styles.line + ' ' + styles.orange}>
					<UniversalReset update={update} orderId={orderData.id} APIObject='tfc-details' openAlert={openAlert} condition={{ delivery: 0 }} />
				</div>
				<div className={styles.line + ' ' + styles.orange}>
					<UniversalReset update={update} orderId={orderData.id} APIObject='tfc-details' openAlert={openAlert} condition={{ other: 0 }} />
				</div>

				<div className={styles.line + ' ' + styles.yellow}>
					<UniversalReset update={update} orderId={orderData.id} APIObject='tfc-details' openAlert={openAlert} condition={{ machine_time: 0 }} />
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
					<UniversalReset update={update} orderId={orderData.id} APIObject='tfc-details' openAlert={openAlert} condition={{ locksmiths_works: 0 }} />
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
					<UniversalReset update={update} orderId={orderData.id} APIObject='tfc-details' openAlert={openAlert} condition={{ outsourcing: 0 }} />
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
					<UniversalReset update={update} orderId={orderData.id} APIObject='tfc-details' openAlert={openAlert} condition={{ material: 0 }} />
				</div>

				<div className={styles.line + ' ' + styles.green}>
					<UniversalChange update={update} orderId={orderData.id} openAlert={openAlert} name='defect_extra' />
				</div>
				<div className={styles.line + ' ' + styles.green}>
					<UniversalChange update={update} orderId={orderData.id} openAlert={openAlert} name='complexity_extra' />
				</div>

				<div className={styles.line + ' ' + styles.blue}></div>

				<div className={styles.line}></div>
			</div>
		</>
	)
}
