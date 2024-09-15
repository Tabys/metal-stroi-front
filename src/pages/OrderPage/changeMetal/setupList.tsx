import { Order } from '../../../models'
import { OneSetup } from './oneSetup'
import style from './style.module.css'

type SetupListProp = {
	onChange: () => void
	openAlert: () => void
	order: Order
}

export function SetupList({ onChange, openAlert, order }: SetupListProp) {
	order.setups?.sort((a, b) => (a.id > b.id ? 1 : -1))
	return (
		<div className={style.suffix_form}>
			{order.setups?.map((setup, index) => (
				<OneSetup
					key={setup.id}
					setup={setup}
					openAlert={openAlert}
					onChange={onChange}
				/>
			))}
		</div>
	)
}
