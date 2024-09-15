import { AddSuffix, Order } from '../../../models'
import { OneSetup } from './oneSetup'
import style from './style.module.css'

type SetupListProp = {
	order: Order
	setArrSuffix: React.Dispatch<React.SetStateAction<AddSuffix[]>>
	arrSuffix: AddSuffix[]
}

export function SetupList({ order, setArrSuffix, arrSuffix }: SetupListProp) {
	order.setups?.sort((a, b) => (a.id > b.id ? 1 : -1))
	return (
		<div className={style.suffix_form}>
			{order.setups?.map((setup, index) => (
				<OneSetup
					key={setup.id}
					setup={setup}
					arrSuffix={arrSuffix}
					setArrSuffix={setArrSuffix}
				/>
			))}
		</div>
	)
}
