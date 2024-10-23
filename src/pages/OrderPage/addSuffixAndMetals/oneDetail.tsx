import Tooltip from '../../../components/Tooltip'
import { Detail } from '../../../models'
import style from './style.module.css'

type OneDetailProp = {
	detail: Detail
	dubleDetails: number[]
}

export function OneDetail({ dubleDetails, detail }: OneDetailProp) {
	const duble = dubleDetails.find(idDuble => idDuble === Number(detail.id))

	return (
		<div className={style.detail}>
			{duble ? (
				<Tooltip conditions={true} text='Деталь есть в другом сетапе'>
					<p className={style.duble}>
						<span>{detail.name}</span> {detail.setup_detail.count}шт.*
					</p>
				</Tooltip>
			) : (
				<p>
					<span>{detail.name}</span> {detail.setup_detail.count}шт.
				</p>
			)}
		</div>
	)
}
