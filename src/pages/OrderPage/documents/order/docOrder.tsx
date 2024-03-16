import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../../../hooks/prepareDataList'
import { CreateDetailGroupList } from '../../detailList/createDetailGroupList'
import { PrepArrDetils } from '../components/prepArrDetails'
import { OrderTable } from './orderTable'
import { DocTableDetail } from '../../../../models'
import styles from '../style.module.css'
import Table from 'react-bootstrap/Table'
import { TransformDate } from '../../../../components/TransformDate'
import { CulcTotalData } from '../components/culcTotalData'
import { MetalTable } from './metalTable'

export function DocOrder() {
	const { id } = useParams()
	const { orders } = useOrders(id ? id : '')
	const linkBX = process.env.REACT_APP_BX24_URL + `crm/deal/details/${id}/`
	const full = true

	const arrDetails = orders ? CreateDetailGroupList(orders) : undefined
	const details: DocTableDetail[] | undefined = PrepArrDetils({
		arrDetails,
		orders,
		full,
	})
	const total = CulcTotalData(details)

	// console.log(details)
	return (
		<>
			<div className='container'>
				<Link to='..' relative='path' className='back-link'>
					Вернуться назад
				</Link>
				<div className={styles.doc + ' ' + styles.full}>
					<div className='row g-2'>
						<div className={styles.doc_header}>
							<div className={styles.order_inf}>
								<a
									href={linkBX}
									target='_blank'
									rel='noreferrer'
									className={styles.order_number}
								>
									Заявка № {orders?.order_number}
								</a>
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
									<strong>Срок изготовления заказа:</strong>{' '}
									{orders?.production_time} рабочих дней
								</p>
							</div>
						</div>
					</div>
					<Table bordered hover>
						<thead>
							<tr>
								<th rowSpan={2}>№ п/п</th>
								<th rowSpan={2}>Наименование изделия</th>
								<th rowSpan={2}>Толщина металла, мм</th>
								<th rowSpan={2}>Кол-во, шт</th>
								<th rowSpan={2}>Лазер (время резки)</th>
								<th colSpan={2}>Плазма</th>
								<th rowSpan={2}>Рубка (кол-во рубов)</th>
								<th rowSpan={2}>Гибка (кол-во гибов)</th>
								<th rowSpan={2}>Вальцы</th>
								<th rowSpan={2}>Веc детали</th>
							</tr>
							<tr>
								<th>длина м</th>
								<th>кол-во врез.</th>
							</tr>
						</thead>
						<tbody>
							{details?.map((detail, index) => (
								<OrderTable
									key={index}
									detail={detail}
									index={index}
								/>
							))}

							<tr className={styles.footer}>
								<td colSpan={3}>Итого</td>
								<td>{total.quantity}</td>
								<td>{total.time.toFixed(2)}</td>
								<td>{total.length}</td>
								<td>{total.inset}</td>
								<td>{total.chop}</td>
								<td>{total.bend}</td>
								<td>-</td>
								<td>{total.weight.toFixed(2)}</td>
							</tr>
						</tbody>
					</Table>

					<Table bordered hover className={styles.metal}>
						<thead>
							<tr>
								<th colSpan={6}>Металл</th>
							</tr>
							<tr>
								<th>Толщина</th>
								<th>Ширина заготовки</th>
								<th>Длина заготовки</th>
								<th>Кол-во листов</th>
							</tr>
						</thead>
						<tbody>
							{orders?.metals?.map((metal, index) => (
								<MetalTable key={index} metals={metal} />
							))}
						</tbody>
					</Table>
				</div>
			</div>
		</>
	)
}
