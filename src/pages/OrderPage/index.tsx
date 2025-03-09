import { Link, useParams } from 'react-router-dom'
import useOrder from '../../hooks/useOrder'
import { usePaintingMods } from '../../hooks/paintingMods'
import { useUser } from '../../hooks/currentUser'
import { SwitchCalculators } from './SwitchCalculators'
import { Spinner } from 'react-bootstrap'

export function OrderPage() {
	const { id } = useParams()
	const { order, isLoading, updateOrders } = useOrder({ id })
	const { paintingMods } = usePaintingMods()
	const { currentUser } = useUser()

	return (
		<>
			<div className='container-flued px-5 mb-5 main-page'>
				<div className='row  g-2'>
					<Link to={`/`} className='back-link'>
						Вернуться назад
					</Link>
					<h1>
						№{order?.id} | {order?.customer} | {order?.order_number}
					</h1>
					<h2>"{order?.title}"</h2>
				</div>
				{isLoading ? (
					<Spinner animation='border' />
				) : (
					<SwitchCalculators id={id} user={currentUser} order={order} updateOrders={updateOrders} paintingMods={paintingMods} />
				)}
			</div>
		</>
	)
}
