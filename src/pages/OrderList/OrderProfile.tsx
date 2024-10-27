import { Link } from 'react-router-dom'
import { Order } from '../../models'
import { TransformDate } from '../../components/TransformDate'
import { DeleteOrder } from './DeleteOreder'
import { useUser } from '../../hooks/curentUser'
import { Modals } from '../../components/modal/Modals'
import { DelOrderModal } from '../../components/modal/DelOrderModal'

type OrderProps = {
	order: Order
	update: () => void
}

export function OrderProfile({ order, update }: OrderProps) {
	const { currentUser } = useUser()

	return (
		<>
			<div className='col-12 col-sm-6 p-6'>
				<div className='p-2 border bg-light d-flex justify-content-between'>
					<Link to={`/order/${order.id}`} className='text-start text-decoration-none text-muted'>
						№{order?.id} "{order?.title}"
					</Link>
					<div className='d-flex align-items-center'>
						<p className='mb-0 mr-1'>
							{order?.customer} | <TransformDate orderDate={order?.date_сreate} />
						</p>
						{currentUser?.roles === 'ROLE_ADMIN' ? <DelOrderModal order={order} update={update} /> : ''}
					</div>
				</div>
			</div>
		</>
	)
}
