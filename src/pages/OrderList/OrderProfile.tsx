import { Link } from 'react-router-dom'
import { Order } from '../../models'
import { TransformDate } from '../../components/TransformDate'
import { DeleteOrder } from './DeleteOreder'

type OrderProps = {
	order: Order
	update: () => void
}

export function OrderProfile({ order, update }: OrderProps) {
	return (
		<div className='col-12 col-sm-6 p-6'>
			<div className='p-2 border bg-light d-flex justify-content-between'>
				<Link
					to={`/order/${order.id}`}
					className='text-start text-decoration-none text-muted'
				>
					{order.title}
				</Link>
				<div className='d-flex align-items-center'>
					<p className='mb-0 mr-1'>
						<TransformDate orderDate={order?.date_сreate} />
					</p>
					<DeleteOrder order={order} update={update} />
				</div>
			</div>
		</div>
	)
}
