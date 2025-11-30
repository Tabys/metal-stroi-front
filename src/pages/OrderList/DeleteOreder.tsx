import CloseButton from 'react-bootstrap/CloseButton'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Order } from '../../models'
import Tooltip from '../../components/Tooltip'
import apiClient from '../../components/apiClient'

type DeleteOrderProps = {
	order: Order
	update: () => void
}

export function DeleteOrder({ order, update }: DeleteOrderProps) {
	const { handleSubmit } = useForm<Order>()

	const onSubmit: SubmitHandler<Order> = async () => {
		await apiClient.delete<Order>('orders/', {
			data: {
				id: order.id,
			},
		})
		await update()
	}

	return (
		<Tooltip conditions={true} text='Удалить сделку'>
			<div className='custom_close'>
				<CloseButton onClick={handleSubmit(onSubmit)} />
			</div>
		</Tooltip>
	)
}
