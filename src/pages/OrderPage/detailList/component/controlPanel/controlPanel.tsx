import styles from '../../style.module.css'
import { Order } from '../../../../../models'
import { UpdMetal } from './metal/updMetal/updMetal'
import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { ChangeCutPrice } from './cuting/cutPrice/changeCutPrice'
import { ChangeCutType } from './cuting/cutType/ChangeCutType'
import { UniversalReset } from './reset/UniversalReset'
import { ResetPolymerOptions } from './reset/ResetPolymerOptions'
import { OutsourcingRolling } from './rolling/outsourcingRolling'

type ControlPanelProps = {
	orderData: Order
	update: () => void
}

export function ControlPanel({ orderData, update }: ControlPanelProps) {
	const [alertShow, setAlertShow] = useState({
		action: false,
		type: 'success',
		message: 'Изменения сохранены',
	})

	const openAlert = (type: string, message?: string) => {
		setAlertShow({
			action: true,
			type: type,
			message: message ?? 'Изменения сохранены',
		})
		setTimeout(() => {
			setAlertShow({
				action: false,
				type: 'success',
				message: 'Изменения сохранены',
			})
		}, 1000)
	}

	return (
		<>
			<div className={styles.row + ' ' + styles.controll_panel}>
				<div className={styles.line}></div>
				<div className={styles.line}></div>
				<div className={styles.line}></div>

				<div className={styles.line + ' ' + styles.brown}></div>
				<div className={styles.line + ' ' + styles.brown}></div>
				<div className={styles.line + ' ' + styles.brown}>
					<UpdMetal update={update} orderId={orderData.id} openAlert={openAlert} />
				</div>

				<ChangeCutType update={update} orderId={orderData.id} openAlert={openAlert} />
				<div className={styles.line + ' ' + styles.green}></div>
				<div className={styles.line + ' ' + styles.green}>
					<ChangeCutPrice update={update} orderId={orderData.id} openAlert={openAlert} />
				</div>

				<div className={styles.line + ' ' + styles.yellow}>
					<UniversalReset update={update} orderId={orderData.id} openAlert={openAlert} condition={{ bends_count: 0, bend_cost: 0 }} />
				</div>
				<div className={styles.line + ' ' + styles.yellow}></div>

				<div className={styles.line + ' ' + styles.orange}>
					<UniversalReset update={update} orderId={orderData.id} openAlert={openAlert} condition={{ chop_count: 0, chop_cost: 0 }} />
				</div>
				<div className={styles.line + ' ' + styles.orange}></div>

				<div className={styles.line + ' ' + styles.blue}>
					<OutsourcingRolling update={update} orderData={orderData} openAlert={openAlert} />
				</div>
				<div className={styles.line + ' ' + styles.blue}></div>

				<div className={styles.line + ' ' + styles.red}>
					<UniversalReset
						update={update}
						orderId={orderData.id}
						openAlert={openAlert}
						condition={{ polymer: null, polymer_options: null, polymer_price: 0, polymer_base_price: 0 }}
					/>
				</div>
				<div className={styles.line + ' ' + styles.red}>
					<ResetPolymerOptions update={update} orderId={orderData.id} openAlert={openAlert} />
				</div>
				<div className={styles.line + ' ' + styles.red}></div>

				<div className={styles.line + ' ' + styles.purple}>
					<UniversalReset update={update} orderId={orderData.id} openAlert={openAlert} condition={{ drowing: 0 }} />
				</div>

				<div className={styles.line}></div>
			</div>

			<Alert className='alert-fixed' show={alertShow.action} variant={alertShow.type}>
				{alertShow.message}
			</Alert>
		</>
	)
}
