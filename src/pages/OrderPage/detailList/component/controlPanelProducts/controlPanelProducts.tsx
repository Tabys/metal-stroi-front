import styles from '../../../productList/styles.module.css'
import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { UniversalReset } from '../controlPanel/reset/UniversalReset'
import { Order, PaintingMods } from '../../../../../models'

type ControlPanelProductsProps = {
	orderData: Order
	paintingMods?: PaintingMods[]
	update: () => void
}

export function ControlPanelProducts({ orderData, paintingMods, update }: ControlPanelProductsProps) {
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
				type: 'type',
				message: message ?? 'Изменения сохранены',
			})
		}, 1000)
	}

	return (
		<>
			<div className={styles.row + ' ' + styles.control_panel}>
				<div className={styles.line}></div>
				<div className={styles.line}></div>
				<div className={styles.line}></div>
				<div className={styles.line}></div>
				<div className={styles.line + ' ' + styles.yellow}>
					<UniversalReset update={update} orderId={orderData.id} openAlert={openAlert} condition={{ sm_works: 0 }} APIObject='products' />
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
					<UniversalReset update={update} orderId={orderData.id} openAlert={openAlert} condition={{ mk_works: 0 }} APIObject='products' />
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
					<UniversalReset update={update} orderId={orderData.id} openAlert={openAlert} condition={{ smithy: 0 }} APIObject='products' />
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
					<UniversalReset update={update} orderId={orderData.id} openAlert={openAlert} condition={{ tfc_works: 0 }} APIObject='products' />
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
					<UniversalReset update={update} orderId={orderData.id} openAlert={openAlert} condition={{ ac_works: 0 }} APIObject='products' />
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
					<UniversalReset update={update} orderId={orderData.id} openAlert={openAlert} condition={{ turning_works: 0 }} APIObject='products' />
				</div>
				<div className={styles.line + ' ' + styles.red}></div>
				<div className={styles.line + ' ' + styles.red}></div>
				<div className={styles.line + ' ' + styles.red}></div>
				<div className={styles.line + ' ' + styles.purple}>
					<UniversalReset update={update} orderId={orderData.id} openAlert={openAlert} condition={{ design_department: 0 }} APIObject='products' />
				</div>
				<div className={styles.line}></div>
				<div className={styles.line}></div>
			</div>

			<Alert className='alert-fixed' show={alertShow.action} variant={alertShow.type}>
				{alertShow.message}
			</Alert>
		</>
	)
}
