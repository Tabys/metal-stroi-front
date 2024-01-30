import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../../../hooks/prepareDataList'
import { CreateDetailGroupList } from '../../detailList/createDetailGroupList'
import { culcNeededMetal } from '../components/culcNeededMetal'
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

	const arrDetails = orders ? CreateDetailGroupList(orders) : ''
	const neededMetal = culcNeededMetal(orders)
	const details: DocTableDetail[] | undefined = PrepArrDetils({
		neededMetal,
		arrDetails,
		orders,
	})
	const total = CulcTotalData(details)

	let deliveryCost: number | null = null
	if (orders?.delivery === true) {
		deliveryCost = Math.ceil(total.weight / 500) * 500
	}
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
								<th colSpan={7}>Резка</th>
								<th colSpan={3}>Рубка</th>
								<th colSpan={3}>Гибка</th>
								<th rowSpan={2}>Металл</th>
								<th rowSpan={2}>Стоимость, руб.</th>
							</tr>
							<tr>
								<th>тип</th>
								<th>t, мин</th>
								<th>длина м</th>
								<th>цена</th>
								<th>кол-во врез.</th>
								<th>цена врезки</th>
								<th>Ст-ть, руб</th>
								<th>кол-во рубов</th>
								<th>цена, руб/руб</th>
								<th>Ст-ть, руб</th>
								<th>кол-во гибов</th>
								<th>цена, руб/гиб</th>
								<th>Ст-ть, руб</th>
							</tr>
						</thead>
						<tbody>
							{details?.map((detail, index) => (
								<OrderTable
									key={index}
									details={detail}
									index={index}
								/>
							))}
							{orders?.delivery === true ? (
								<tr>
									<td colSpan={3}>
										<strong>Доставка</strong>
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td>
										<strong>{deliveryCost}</strong>
									</td>
								</tr>
							) : (
								<></>
							)}
							<tr className={styles.footer}>
								<td colSpan={3}>Итого стоимость по заказу</td>
								<td>{total.quantity}</td>
								<td></td>
								<td>{total.time.toFixed(2)}</td>
								<td>{total.length}</td>
								<td></td>
								<td>{total.inset}</td>
								<td></td>
								<td>{total.cuting}</td>
								<td>{total.chop}</td>
								<td></td>
								<td>{total.choping}</td>
								<td>{total.bend}</td>
								<td></td>
								<td>{total.bending}</td>
								<td>{total.metal}</td>
								<td>
									{deliveryCost
										? (total.price + deliveryCost).toFixed(
												1
										  )
										: total.price.toFixed(1)}
								</td>
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
							{neededMetal?.map((metal, index) => (
								<MetalTable key={index} metals={metal} />
							))}
						</tbody>
					</Table>
				</div>
			</div>
		</>
	)
}
