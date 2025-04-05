import { TFCTotal } from '../../../../models'
import styles from './style.module.css'

type TfcTotalFooterProps = {
	total: TFCTotal
}

export function TfcTotalFooter({ total }: TfcTotalFooterProps) {
	return (
		<div className={styles.row + ' ' + styles.footer}>
			<div className={styles.line}></div>
			<div className={styles.line}></div>
			<div className={styles.line}>Итого:</div>
			<div className={styles.line}>{total.setup_time}</div>
			<div className={styles.line}>{total.tools}</div>
			<div className={styles.line}>{total.other_workshops_works}</div>
			<div className={styles.line}>{total.other}</div>
			<div className={styles.line}>{total.machine_time}</div>
			<div className={styles.line}>{total.locksmiths_works}</div>
			<div className={styles.line}>{total.outsourcing}</div>
			<div className={styles.line}>{total.material}</div>
			<div className={styles.line}></div>
			<div className={styles.line}></div>
			<div className={styles.line}>{total.cost}</div>
		</div>
	)
}
