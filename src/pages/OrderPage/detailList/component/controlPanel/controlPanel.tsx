import styles from '../../style.module.css'
import { Order, PaintingMods } from '../../../../../models'
import { UpdMetal } from './metal/updMetal/updMetal'
import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { ChangeCutPrice } from './cuting/cutPrice/changeCutPrice'
import { ChangeCutType } from './cuting/cutType/ChangeCutType'
import { UniversalReset } from './reset/UniversalReset'
import { PolymerOptions } from './painting/polymerOptions/polymerOptions'
import { OutsourcingRolling } from './rolling/outsourcingRolling'
import { ChgAllPPOneElemPrice } from './painting/oneElemPrice/ChgAllPPOneElemPrice'
import { ChangePaintingColor } from './painting/paintingColor/changePaintingColor'
import { ChangeInsetPrice } from './cuting/insetPrice/insetPrice'
import { ChangeRollingPrice } from './rolling/changeRollingPrice'
import { ChangeBendingPrice } from './bending/changeBendingPrice'
import { ChangeChopingPrice } from './choping/changeChopingPrice'
import { ChangeDrowingPrice } from './drowing/changeDrowingPrice'
import { ChangeQuantity } from './quantity/ChangeQuantity'

type ControlPanelProps = {
	orderData: Order
	paintingMods: PaintingMods[]
	update: () => void
}

export function ControlPanel({ orderData, paintingMods, update }: ControlPanelProps) {
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
			<div className={styles.row + ' ' + styles.controll_panel}>
				<div className={styles.line}></div>
				<div className={styles.line}></div>
				<div className={styles.line}>
					<ChangeQuantity update={update} orderId={orderData.id} openAlert={openAlert} />
				</div>

				<div className={styles.line + ' ' + styles.brown}></div>
				<div className={styles.line + ' ' + styles.brown}></div>
				<div className={styles.line + ' ' + styles.brown}>
					<UpdMetal update={update} orderId={orderData.id} openAlert={openAlert} />
				</div>

				<ChangeCutType update={update} orderId={orderData.id} openAlert={openAlert} />
				<div className={styles.line + ' ' + styles.green}>
					<ChangeInsetPrice update={update} orderId={orderData.id} openAlert={openAlert} />
				</div>
				<div className={styles.line + ' ' + styles.green}>
					<ChangeCutPrice update={update} orderId={orderData.id} openAlert={openAlert} />
				</div>

				<div className={styles.line + ' ' + styles.yellow}>
					<UniversalReset update={update} orderId={orderData.id} openAlert={openAlert} condition={{ bends_count: 0, bend_cost: 0 }} />
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
					<ChangeBendingPrice update={update} orderId={orderData.id} openAlert={openAlert} />
				</div>

				<div className={styles.line + ' ' + styles.orange}>
					<UniversalReset update={update} orderId={orderData.id} openAlert={openAlert} condition={{ chop_count: 0, chop_cost: 0 }} />
				</div>
				<div className={styles.line + ' ' + styles.orange}>
					<ChangeChopingPrice update={update} orderId={orderData.id} openAlert={openAlert} />
				</div>

				<div className={styles.line + ' ' + styles.blue}>
					<OutsourcingRolling update={update} orderData={orderData} openAlert={openAlert} />
				</div>
				<div className={styles.line + ' ' + styles.blue}>
					<ChangeRollingPrice update={update} orderId={orderData.id} openAlert={openAlert} />
				</div>

				<div className={styles.line + ' ' + styles.red}>
					<ChangePaintingColor update={update} orderId={orderData.id} openAlert={openAlert} />
					{/* <UniversalReset
						update={update}
						orderId={orderData.id}
						openAlert={openAlert}
						condition={{ polymer: null, polymer_options: null, polymer_price: 0, polymer_base_price: 0, polymer_one_element_price: 0 }}
					/> */}
				</div>
				<div className={styles.line + ' ' + styles.red}>
					<PolymerOptions update={update} orderId={orderData.id} openAlert={openAlert} paintingMods={paintingMods} />
				</div>
				{/* <div className={styles.line + ' ' + styles.red}></div> */}
				<div className={styles.line + ' ' + styles.red}>
					<ChgAllPPOneElemPrice update={update} orderId={orderData.id} openAlert={openAlert} />
				</div>

				<div className={styles.line + ' ' + styles.purple}>
					{/* <UniversalReset update={update} orderId={orderData.id} openAlert={openAlert} condition={{ drowing: 0 }} /> */}
					<ChangeDrowingPrice update={update} orderId={orderData.id} openAlert={openAlert} />
				</div>

				<div className={styles.line}></div>
			</div>

			<Alert className='alert-fixed' show={alertShow.action} variant={alertShow.type}>
				{alertShow.message}
			</Alert>
		</>
	)
}
