import { AddDetailSetupModal } from '../../components/modal/AddDetailSetupModal'
import { UploadSetupModal } from '../../components/modal/UploadSetupModal'
import { useRates } from '../../hooks/useRates'
import { Order, PaintingMods, UserData } from '../../models'
import { LaserWorkshop } from './LaserWorkshop'
import { MKCMXKWorkshop } from './MKCMXKWorkshop'
import { UploadWorkshop } from './MKCMXKWorkshop/uploadWorksop/UploadWorksop'
import { TFCWorkshop } from './TFCWorkshop'

type SwitchCalculatorsProps = {
	id?: string
	order?: Order
	updateOrders: () => Promise<void>
	paintingMods: PaintingMods[]
	user?: UserData
}

export function SwitchCalculators({ id, order, updateOrders, paintingMods, user }: SwitchCalculatorsProps) {
	const { rates } = useRates()

	switch (order?.division) {
		case 3:
			return user?.roles === 'ROLE_USER_WORKSHOPS' || user?.roles === 'ROLE_USER_TFC' ? (
				<p>У вас нет доступа к калькулятору этого цеха</p>
			) : order?.setups?.length ? (
				<LaserWorkshop id={id} order={order} user={user} updateOrders={updateOrders} paintingMods={paintingMods} />
			) : (
				// <pre>{JSON.stringify(order, null, 2)}</pre>
				<>
					<p>Элементов нет</p>
					<div className='fixed-element'>
						<UploadSetupModal onCreate={updateOrders} orderId={Number(id)} />
						<AddDetailSetupModal onAdd={updateOrders} setups={order?.setups} order_id={order?.id} />
					</div>
				</>
			)

		case 17:
		case 18:
		case 19:
			return user?.roles === 'ROLE_USER' || user?.roles === 'ROLE_USER_TFC' ? (
				<p>У вас нет доступа к калькулятору этого цеха</p>
			) : order?.workshops_data ? (
				<MKCMXKWorkshop id={id} user={user} rates={rates} order={order} updateOrders={updateOrders} paintingMods={paintingMods} />
			) : (
				<>
					<p>Элементов нет</p>
					<div className='fixed-element'>
						<UploadWorkshop orderId={Number(id)} onCreate={updateOrders} apiUrl='workshops-data/' />
					</div>
				</>
			)
		case 16:
			return user?.roles === 'ROLE_USER' || user?.roles === 'ROLE_USER_WORKSHOPS' ? (
				<p>У вас нет доступа к калькулятору этого цеха</p>
			) : order?.tfc_data ? (
				<TFCWorkshop id={id} rates={rates} user={user} order={order} updateOrders={updateOrders} />
			) : (
				<>
					<p>Элементов нет</p>
					<div className='fixed-element'>
						<UploadWorkshop orderId={Number(id)} onCreate={updateOrders} apiUrl='tfc-data/' />
					</div>
				</>
			)
		default:
			return <p>Для этого цеха нет калькулятора</p>
	}
}
