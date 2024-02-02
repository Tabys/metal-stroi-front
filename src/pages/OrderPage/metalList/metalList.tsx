import { Metal } from '../../../models'
import { FormMetalList } from './formMetalList'
import styles from './style.module.css'

type metalListProps = {
	metal: Metal[]
}

export function MetalList({ metal }: metalListProps) {
	return (
		<div className={styles.wrapper_table}>
			<div className={styles.detail_list}>
				<div className={styles.theader}>Металл</div>
				<div className={styles.row + ' ' + styles.header}>
					<div>Толщина</div>
					<div>Ширина</div>
					<div>Длина</div>
					<div>Листы</div>
				</div>

				<FormMetalList metal={metal} />
			</div>
		</div>
	)
}
