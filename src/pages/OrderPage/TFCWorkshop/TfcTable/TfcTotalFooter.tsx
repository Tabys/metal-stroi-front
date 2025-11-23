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
			<div className={styles.line}>{total.milling_setup_time}</div>
			<div className={styles.line}>{total.turning_setup_time}</div>
			<div className={styles.line}>{total.tools}</div>
			<div className={styles.line}>{total.other_workshops_works}</div>
			<div className={styles.line}>{total.other}</div>
			<div className={styles.line}>{total.milling_time}</div>
			<div className={styles.line}>{total.turning_time}</div>
			<div className={styles.line}>{total.universal_time}</div>
			<div className={styles.line}>{total.erosion_time}</div>
			<div className={styles.line}>{total.grinding_time}</div>
			<div className={styles.line}>{total.outsourcing}</div>
			<div className={styles.line}>{total.material}</div>
			<div className={styles.line}></div>
			<div className={styles.line}></div>
			<div className={styles.line}>{Math.ceil(total.cost)}</div>
			<div className={styles.line}></div>
		</div>
	)
}
