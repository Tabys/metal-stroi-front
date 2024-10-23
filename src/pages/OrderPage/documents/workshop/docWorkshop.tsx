import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../../../hooks/prepareDataList'
import { CreateDetailGroupList } from '../../detailList/createDetailGroupList'
import { PrepArrDetils } from '../components/prepArrDetails/prepArrDetails'
import { DocTableDetail } from '../../../../models'
import styles from '../style.module.css'
import Table from 'react-bootstrap/Table'
import { TransformDate } from '../../../../components/TransformDate'
import { WorkshopTable } from './workshopTable'
import { MetalTable } from './metalTable'
import { CulcTotalData } from '../components/culcTotalData'
import { useMaterials } from '../../../../hooks/materials'
import { prepMetalData } from './prepMetalData'

export function DocWorkhop() {
	const { id } = useParams()
	const { orders } = useOrders(id ? id : '')
	const { materials } = useMaterials()

	const setups = prepMetalData({ setups: orders?.setups, materials })

	const arrDetails = orders ? CreateDetailGroupList(orders) : undefined
	const details: DocTableDetail[] | undefined = PrepArrDetils({
		arrDetails,
		orders,
		full: true,
	})
	const total = CulcTotalData({ details })

	return (
		<>
			<div className='container'>
				<Link to='..' relative='path' className='back-link'>
					Вернуться назад
				</Link>
				<div className={styles.doc}>
					<div className='row g-2'>
						<div className={styles.doc_header}>
							<div className={styles.order_inf}>
								<p className={styles.order_number}>
									<strong>Заявка в цех № {orders?.order_number}</strong>
								</p>
								<p>
									<strong>Дата приема заказа:</strong> <TransformDate orderDate={orders?.date_сreate} />
								</p>
								<p>
									<strong>Заказчик:</strong> {orders?.customer}
								</p>
								<p>
									<strong>Технолог:</strong> {orders?.implementer}
								</p>
							</div>
						</div>
					</div>
					<Table bordered hover>
						<thead>
							<tr>
								<th>№ п/п</th>
								<th>Наименование изделия</th>
								<th>Толщина металла, мм</th>
								<th>Кол-во, шт</th>
								{orders?.work_types.find(work_type => work_type === 246 || work_type === 254) ? <th>Вид резки</th> : ''}
								{orders?.work_types.find(work_type => work_type === 250) ? <th>Рубка</th> : ''}
								{orders?.work_types.find(work_type => work_type === 248) ? <th>Гибка</th> : ''}
								{orders?.work_types.find(work_type => work_type === 252) ? <th>Вальцовка</th> : ''}
								{orders?.work_types.find(work_type => work_type === 330 || work_type === 478) ? (
									<th>
										{orders?.work_types.find(work_type => work_type === 330) ? 'МК' : ''}{' '}
										{orders?.work_types.find(work_type => work_type === 478) ? 'СМ' : ''}
									</th>
								) : (
									''
								)}
								{orders?.work_types.find(work_type => work_type === 320) ? <th>Полим.</th> : ''}
								{orders?.work_types.find(work_type => work_type === 458) ? <th>Кузня</th> : ''}
								{orders?.work_types.find(work_type => work_type === 470) ? <th>Токарка</th> : ''}
							</tr>
						</thead>
						<tbody>
							{details?.map((detail, index) => (
								<WorkshopTable key={index} detail={detail} work_types={orders?.work_types} index={index} />
							))}
						</tbody>
					</Table>

					<Table bordered>
						<tbody>
							<tr>
								{orders?.work_types.find(work_type => work_type === 250) ? (
									<>
										<td>
											<strong>рубов</strong>
										</td>
										<td>{total.chop}</td>
									</>
								) : (
									''
								)}
								{orders?.work_types.find(work_type => work_type === 248) ? (
									<>
										<td>
											<strong>гибов</strong>
										</td>
										<td>{total.bend}</td>
									</>
								) : (
									''
								)}
								<td>
									<strong>общее время, ч</strong>
								</td>
								<td>{(total.time / 60).toFixed(2)}</td>
								<td>
									<strong>общ вес, кг</strong>
								</td>
								<td>{total.weight.toFixed(1)}</td>
							</tr>
						</tbody>
					</Table>

					<Table bordered hover size='sm' className={styles.metal}>
						<thead>
							<tr>
								<th colSpan={4}>Металл</th>
							</tr>
							<tr>
								<th>Толщина</th>
								<th>Ширина</th>
								<th>Длина</th>
								<th>Листы</th>
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
							<p>
								<span>Оператор лазера:</span>
							</p>
							<p>
								<span>Оператор гильотины:</span>
							</p>
							<p>
								<span>Оператор гибочника:</span>
							</p>
							<p>
								<span>Оператор плазмы:</span>
							</p>
							<p>
								<span>Выдал:</span>
							</p>
						</div>
						<div className={styles.block}>
							<p>
								<strong>Подразделения:</strong>
							</p>
							<p>
								<span>Лазерный цех:</span>
							</p>
							<p>
								<span>Цех полимерного покрытия:</span>
							</p>
							<p>
								<span>Цех сельхозмашиностроения:</span>
							</p>
							<p>
								<span>Токарно-фрезерный цех:</span>
							</p>
							<p>
								<span>Цех художественной ковки:</span>
							</p>
							<p>
								<span>Аддитивный цех:</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
