import { AddDetailSetupModal } from '../../components/modal/AddDetailSetupModal'
import { UploadSetupModal } from '../../components/modal/UploadSetupModal'
import { Order, PaintingMods, UserData } from '../../models'
import { LaserWorkshop } from './LaserWorkshop'
import { MKCMXKWorkshop } from './MKCMXKWorkshop'
import { UploadWorkshop } from './MKCMXKWorkshop/uploadWorksop/UploadWorksop'

type SwitchCalculatorsProps = {
	id?: string
	order?: Order
	updateOrders: () => Promise<void>
	paintingMods: PaintingMods[]
	user?: UserData
}

export function SwitchCalculators({ id, order, updateOrders, paintingMods, user }: SwitchCalculatorsProps) {
	switch (order?.division) {
		case 20:
			return user?.roles === 'ROLE_USER_WORKSHOPS' ? (
				<p>У вас нет доступа к калькулятору этого цеха</p>
			) : order?.setups?.length ? (
				<LaserWorkshop id={id} order={order} updateOrders={updateOrders} paintingMods={paintingMods} />
			) : (
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
			return user?.roles === 'ROLE_USER' ? (
				<p>У вас нет доступа к калькулятору этого цеха</p>
			) : order?.workshops_data ? (
				<MKCMXKWorkshop id={id} user={user} order={order} updateOrders={updateOrders} paintingMods={paintingMods} />
			) : (
				<>
					<p>Элементов нет</p>
					<div className='fixed-element'>
						<UploadWorkshop orderId={Number(id)} onCreate={updateOrders} />
					</div>
				</>
			)
		default:
			return <p>Для этого цеха нет калькулятора</p>
	}
}
