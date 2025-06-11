import { useParams } from 'react-router-dom'
import { useOrders } from '../../../../../hooks/prepareDataList'
import { CreateDetailGroupList } from '../../../LaserWorkshop/detailList/createDetailGroupList'
import { PrepArrDetails } from '../components/prepArrDetails/prepArrDetails'
import { DocTableDetail, Order } from '../../../../../models'
import styles from '../style.module.css'
import Table from 'react-bootstrap/Table'
import { TransformDate } from '../../../../../components/TransformDate'
import { WorkshopTable } from './workshopTable'
import { MetalTable } from './metalTable'
import { CulcTotalData } from '../components/culcTotalData'
import { useMaterials } from '../../../../../hooks/materials'
import { prepMetalData } from './prepMetalData'
import { Alert } from 'react-bootstrap'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import apiClient from '../../../../../components/apiClient'

export function DocWorkhop() {
	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const { id } = useParams()
	const { orders } = useOrders({ id: id ? id : '' })
	const { materials } = useMaterials()
	const setups = prepMetalData({ setups: orders?.setups, materials })

	orders?.metals?.sort((a, b) => (a.thickness > b.thickness ? 1 : -1))

	const arrDetails = orders ? CreateDetailGroupList(orders) : undefined
	const details: DocTableDetail[] | undefined = PrepArrDetails({
		arrDetails,
		order: orders,
		full: true,
	})
	const total = CulcTotalData({ details })

	const { register, handleSubmit } = useForm<Order>()

	const onSubmit: SubmitHandler<Order> = async data => {
		await apiClient.put<Order>('orders/', data)
		openAlert()
	}

	return (
		<>
			<div className={styles.doc}>
				<div className='row g-2'>
					<div className={styles.doc_header}>
						<div className={styles.order_inf}>
							<p className={styles.order_number}>
								<strong>Заявка в цех № {String(orders?.order_number).split('_')[0]}</strong>
							</p>
							<p className={styles.customer}>
								<strong>Заказчик:</strong> {orders?.customer}
							</p>
							<p className={styles.customer}>
								<strong>Сделка:</strong> {orders?.title}
							</p>
							<div className={styles.flex}>
								<div className={styles.group}>
									<p>
										<strong>Дата приема заказа:</strong> <TransformDate orderDate={orders?.date_create} />
									</p>
									<p>
										<strong>Технолог:</strong> {orders?.implementer}
									</p>
								</div>
								<div className={styles.group}>
									<form className={styles.comment}>
										<input type='hidden' {...register('id')} defaultValue={id} />
										<textarea
											{...register('comment_workshop', {
												onBlur: handleSubmit(onSubmit),
											})}
											className={'form-control ' + styles.textarea_mini}
											placeholder='Комментарий для производства'
											defaultValue={orders?.comment_workshop}
										></textarea>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.separator}></div>

				<Table bordered hover className='narrow_cells'>
					<thead>
						<tr>
							<th>
								№<br />
								п/п
							</th>
							<th>Наименование изделия</th>
							<th>
								Толщина
								<br />
								металла, мм
							</th>
							<th>
								Кол-во,
								<br /> шт
							</th>
							<th>Вид резки</th>
							{orders?.work_types.find(work_type => work_type === 79) ? <th>Рубка</th> : ''}
							{orders?.work_types.find(work_type => work_type === 78) ? <th>Гибка</th> : ''}
							{orders?.work_types.find(work_type => work_type === 80) ? (
								<th>{orders?.rolling_outsourcing ? 'Вальцовка Трошин' : 'Вальцовка'}</th>
							) : (
								''
							)}
							{orders?.work_types.find(work_type => work_type === 83 || work_type === 88) ? (
								<th>
									{orders?.work_types.find(work_type => work_type === 83) ? 'МК' : ''}{' '}
									{orders?.work_types.find(work_type => work_type === 88) ? 'СМ' : ''}
								</th>
							) : (
								''
							)}
							{orders?.work_types.find(work_type => work_type === 82) ? <th>Полим.</th> : ''}
							{orders?.work_types.find(work_type => work_type === 87) ? <th>Кузня</th> : ''}
							{orders?.work_types.find(work_type => work_type === 89) ? <th>Токарка</th> : ''}
						</tr>
					</thead>
					<tbody>
						{details?.map((detail, index) => (
							<WorkshopTable key={index} detail={detail} work_types={orders?.work_types} index={index} />
						))}

						<tr>
							<td></td>
							<td>
								<strong>общ вес, кг</strong>
							</td>
							<td>{total.weight.toFixed(1)} кг</td>
							<td>
								<strong>общее время, ч</strong>
							</td>
							<td>{(total.time / 60).toFixed(2)}</td>
							{orders?.work_types.find(work_type => work_type === 79) ? <td>{total.chop}</td> : ''}
							{orders?.work_types.find(work_type => work_type === 78) ? <td>{total.bend}</td> : ''}
							{orders?.work_types.find(work_type => work_type === 80) ? <td></td> : ''}
							{orders?.work_types.find(work_type => work_type === 82) ? <td></td> : ''}
							{orders?.work_types.find(work_type => work_type === 87) ? <td></td> : ''}
							{orders?.work_types.find(work_type => work_type === 89) ? <td></td> : ''}
						</tr>
					</tbody>
				</Table>

				{/* {Number(details?.length) > 20 ? <div className='page_brake'></div> : ''} */}

				<Table bordered hover size='sm' className={'mt-3 narrow_cells ' + styles.metal}>
					<thead>
						<tr>
							<th colSpan={7}>Металл</th>
						</tr>
						<tr>
							<th>зак/наш</th>
							<th>Вид металла</th>
							<th>Толщина</th>
							<th>Ширина</th>
							<th>Длина</th>
							<th>Листы</th>
							<th>Комментарий</th>
						</tr>
					</thead>
					<tbody>
						{setups?.map((metal, index) => (
							<MetalTable key={index} metals={metal} />
						))}
					</tbody>
				</Table>

				<div className={styles.specifications}>
					<div className={styles.block}>
						<p>
							<strong>Исполнители:</strong>
						</p>

						{orders?.work_types.find(work_type => work_type === 77) ? (
							<p>
								<span>Оператор лазера:</span>
							</p>
						) : (
							''
						)}

						{orders?.work_types.find(work_type => work_type === 79) ? (
							<p>
								<span>Оператор гильотины:</span>
							</p>
						) : (
							''
						)}

						{orders?.work_types.find(work_type => work_type === 78) ? (
							<p>
								<span>Оператор гибочника:</span>
							</p>
						) : (
							''
						)}

						{orders?.work_types.find(work_type => work_type === 81) ? (
							<p>
								<span>Оператор плазмы:</span>
							</p>
						) : (
							''
						)}

						{orders?.work_types.find(work_type => work_type === 80) ? (
							<p>
								<span>Оператор вальцов:</span>
							</p>
						) : (
							''
						)}

						<p className='mt-5'>
							<span>Детали принял:</span>
						</p>
					</div>
					<div className={styles.block}>
						{orders?.work_types.find(
							work_type =>
								work_type === 82 ||
								work_type === 88 ||
								work_type === 84 ||
								work_type === 87 ||
								work_type === 85 ||
								work_type === 89 ||
								work_type === 83 ||
								work_type === 21 ||
								work_type === 19 ||
								work_type === 15 ||
								work_type === 14 ||
								work_type === 22
						) ? (
							<>
								<p>
									<strong>Передать в:</strong>
								</p>
							</>
						) : (
							''
						)}
						{orders?.work_types.find(work_type => work_type === 82) ? (
							<p>
								<span>Цех полимерного покрытия:</span>
							</p>
						) : (
							''
						)}
						{orders?.work_types.find(work_type => work_type === 83 || work_type === 21) ? (
							<p>
								<span>Цех металлоконструкций:</span>
							</p>
						) : (
							''
						)}
						{orders?.work_types.find(work_type => work_type === 88 || work_type === 15) ? (
							<p>
								<span>Цех сельхозмашиностроения:</span>
							</p>
						) : (
							''
						)}
						{orders?.work_types.find(work_type => work_type === 84 || work_type === 14) ? (
							<p>
								<span>Токарно-фрезерный цех:</span>
							</p>
						) : (
							''
						)}
						{orders?.work_types.find(work_type => work_type === 87 || work_type === 22) ? (
							<p>
								<span>Цех художественной ковки:</span>
							</p>
						) : (
							''
						)}
						{orders?.work_types.find(work_type => work_type === 85 || work_type === 19) ? (
							<p>
								<span>Аддитивный цех:</span>
							</p>
						) : (
							''
						)}
						{orders?.work_types.find(work_type => work_type === 89) ? (
							<p>
								<span>Токарка (универсал):</span>
							</p>
						) : (
							''
						)}
					</div>
				</div>
			</div>
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Комментарий сохранён
			</Alert>
		</>
	)
}
