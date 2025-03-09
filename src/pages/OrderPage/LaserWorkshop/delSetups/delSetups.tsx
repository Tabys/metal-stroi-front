import { Order } from '../../../../models'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SetupList } from './setupList'
import apiClient from '../../../../components/apiClient'

type DelSetupsProps = {
	onDel: () => void
	onClose: () => void
	order: Order
}

export function DelSetups({ onDel, onClose, order }: DelSetupsProps) {
	const { handleSubmit } = useForm<Order>()

	const onSubmit: SubmitHandler<Order> = async data => {
		await apiClient.delete<Order>('setup/all', { data: { id: order.id } })
		await onDel()
		await onClose()
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<button type='submit' className='btn btn-danger container-fluid mb-3'>
					Удалить все сетапы
				</button>
			</form>
			<SetupList order={order} onDel={onDel} />
		</>
	)
}
