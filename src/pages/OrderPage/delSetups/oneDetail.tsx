import { Detail } from '../../../models'
import style from './style.module.css'

type OneDetailProp = {
	detail: Detail
}

export function OneDetail({ detail }: OneDetailProp) {
	return (
		<div className={style.detail}>
			<p>
				{detail.name} | {detail.setup_detail.count}шт.
			</p>
		</div>
	)
}
