import { Order } from '../../../../models'
import { useForm, SubmitHandler } from 'react-hook-form'
import apiClient from '../../../../components/apiClient'
import { DelWorkshopProduct } from './DelWorkshopProduct'

type DelSetupsProps = {
	onDel: () => void
	onClose: () => void
	order: Order
}

export function DelWorkshopProducts({ onDel, onClose, order }: DelSetupsProps) {
	const { handleSubmit } = useForm<Order>()

	const onSubmit: SubmitHandler<Order> = async data => {
		await apiClient
			.delete<Order>('workshops-products/all', { data: { order_id: order.id } })
			.then(result => {
				onDel()
				onClose()
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<button type='submit' className='btn btn-danger container-fluid mb-3'>
					Удалить все позиции
				</button>
			</form>
			<DelWorkshopProduct order={order} onDel={onDel} />
		</>
	)
}
