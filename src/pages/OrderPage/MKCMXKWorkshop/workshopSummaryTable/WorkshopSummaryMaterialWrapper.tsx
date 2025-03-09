import { SubmitHandler, useForm } from 'react-hook-form'
import { Order, RoundingUpMaterialType } from '../../../../models'
import styles from '../workshopProductsTable/style.module.css'
import { crateMaterialGroupList } from './crateMaterialGroupList'
import { WorkshopSummaryMaterialItem } from './WorkshopSummaryMaterialItem'
import apiClient from '../../../../components/apiClient'
import Tooltip from '../../../../components/Tooltip'
import { FaArrowsRotate, FaCircleNotch } from 'react-icons/fa6'

type WorkshopSummaryMaterialWrapperProps = {
	order?: Order
	onCreate: () => void
	openAlert: (type: string, massage?: string) => void
}

export function WorkshopSummaryMaterialWrapper({ order, onCreate, openAlert }: WorkshopSummaryMaterialWrapperProps) {
	const { handleSubmit } = useForm<RoundingUpMaterialType>()

	const onSubmit: SubmitHandler<RoundingUpMaterialType> = async data => {
		data.order_id = order?.id

		await apiClient
			.post<RoundingUpMaterialType>('workshops-product-material/rounding-up', data)
			.then(result => {
				onCreate()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}
	const onSubmitReset: SubmitHandler<RoundingUpMaterialType> = async data => {
		data.order_id = order?.id

		await apiClient
			.post<RoundingUpMaterialType>('workshops-product-material/reset', data)
			.then(result => {
				onCreate()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}
	const onSubmitPrice: SubmitHandler<RoundingUpMaterialType> = async data => {
		data.order_id = order?.id

		await apiClient
			.post<RoundingUpMaterialType>('workshops-product-material/upd-price', data)
			.then(result => {
				onCreate()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	const materials = crateMaterialGroupList(order)

	return (
		<>
			<div className={styles.table}>
				<div className={styles.tbody}>
					<div className={styles.tr + ' ' + styles.thead}>
						<div className={styles.td}>Наименование</div>
						<div className={styles.td}>
							Количество (в ед. изм.){' '}
							<div className={styles.stack}>
								<form onSubmit={handleSubmit(onSubmitReset)}>
									<Tooltip conditions={true} text='Актуализировать количество'>
										<button type='submit' className='btn btn-link'>
											<FaArrowsRotate />
										</button>
									</Tooltip>
								</form>
								<form onSubmit={handleSubmit(onSubmit)}>
									<Tooltip conditions={true} text='Округлить'>
										<button type='submit' className='btn btn-link'>
											<FaCircleNotch />
										</button>
									</Tooltip>
								</form>
							</div>
						</div>
						<div className={styles.td}>
							Цена материала
							<form onSubmit={handleSubmit(onSubmitPrice)}>
								<Tooltip conditions={true} text='Актуализировать цены на материал'>
									<button type='submit' className='btn btn-link'>
										<FaArrowsRotate />
									</button>
								</Tooltip>
							</form>
						</div>
					</div>

					{materials.map(material => (
						<WorkshopSummaryMaterialItem key={material.id} order_id={order?.id} material={material} onUpdate={onCreate} openAlert={openAlert} />
					))}
				</div>
			</div>
		</>
	)
}
