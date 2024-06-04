import { Order } from '../../../models'
import { SetupList } from './setupList'

type ChangeMetalProps = {
	onChange: () => void
	openAlert: () => void
	order: Order
}

export function ChangeMetal({ onChange, openAlert, order }: ChangeMetalProps) {
	return <SetupList order={order} openAlert={openAlert} onChange={onChange} />
}
