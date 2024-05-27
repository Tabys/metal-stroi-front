import { Order } from '../../../models'
import { SetupList } from './setupList'

type ChangeMetalProps = {
	onChange: () => void
	order: Order
}

export function ChangeMetal({ onChange, order }: ChangeMetalProps) {
	return <SetupList order={order} onChange={onChange} />
}
