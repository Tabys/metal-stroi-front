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

	// console.log(setups)

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
									<strong>
										Заявка в цех № {orders?.order_number}
									</strong>
								</p>
								<p>
									<strong>Дата приема заказа:</strong>{' '}
									<TransformDate
										orderDate={orders?.date_сreate}
									/>
								</p>
								<p>
									<strong>Заказчик:</strong>{' '}
									{orders?.customer}
								</p>
								<p>
									<strong>Технолог:</strong>{' '}
									{orders?.implementer}
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
								<th>Вид резки</th>
								<th>Рубка</th>
								<th>Гибка</th>
								<th>Вальцовка</th>
							</tr>
						</thead>
						<tbody>
							{details?.map((detail, index) => (
								<WorkshopTable
									key={index}
									details={detail}
									index={index}
								/>
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

							<Table bordered hover size='sm'>
								<tbody>
									<tr>
										<td>общее время, ч</td>
										<td>{(total.time / 60).toFixed(2)}</td>
									</tr>
									<tr>
										<td>гибов</td>
										<td>{total.bend}</td>
									</tr>
									<tr>
										<td>рубов</td>
										<td>{total.chop}</td>
									</tr>
									<tr>
										<td>общ вес, кг</td>
										<td>{total.weight.toFixed(1)}</td>
									</tr>
								</tbody>
							</Table>
						</div>
						<div className={styles.block}>
							<Table
								bordered
								hover
								size='sm'
								className={styles.metal}
							>
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
										<MetalTable
											key={index}
											metals={metal}
										/>
									))}
								</tbody>
							</Table>
						</div>
					</div>

					<div className={styles.signatures}>
						<p className={styles.right}>
							<span>Детали принял:</span>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
