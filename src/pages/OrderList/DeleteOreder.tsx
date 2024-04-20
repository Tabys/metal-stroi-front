import axios from 'axios'
import CloseButton from 'react-bootstrap/CloseButton'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Order } from '../../models'
import Tooltip from '../../components/Tooltip'

type DeleteOrderProps = {
	order: Order
	update: () => void
}

export function DeleteOrder({ order, update }: DeleteOrderProps) {
	const config = {
		data: {
			id: order.id,
		},
	}

	const { handleSubmit } = useForm<Order>()

	const onSubmit: SubmitHandler<Order> = async () => {
		await axios.delete<Order>(
			process.env.REACT_APP_BACKEND_API_URL + 'orders/',
			config
		)
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
