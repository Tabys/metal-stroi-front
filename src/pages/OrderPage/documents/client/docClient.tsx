import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../../../hooks/prepareDataList'
import { CreateDetailGroupList } from '../../detailList/createDetailGroupList'
import { culcNeededMetal } from '../components/culcNeededMetal'
import { PrepArrDetils } from '../components/prepArrDetails'
import { ClientTable } from './clientTable'
import { DocTableDetail } from '../../../../models'
import styles from '../style.module.css'
import Table from 'react-bootstrap/Table'
import { TransformDate } from '../../../../components/TransformDate'
import { CulcTotalData } from '../components/culcTotalData'

export function DocClient() {
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
	// console.log(details)

	let deliveryCost: number | null = null
	if (orders?.delivery === true) {
		deliveryCost = Math.ceil(total.weight / 500) * 500
	}

	return (
		<>
			<div className='container'>
				<Link to='..' relative='path' className='back-link'>
					Вернуться назад
				</Link>
				<div className={styles.doc}>
					<div className='row g-2'>
						<div className={styles.doc_header}>
							<div className={styles.compony_inf}>
								<div className={styles.logo}>
									<img src='/logoMS.png' alt='logo' />
								</div>
								<div className={styles.contact_inf}>
									<p>
										ул. Эмилии Алексеевой, 94,
										<br /> тел. 33-33-10, <br />
										email: ms-klient@list.ru
									</p>
								</div>
							</div>
							<div className={styles.order_inf}>
								<a
									href={linkBX}
									target='_blank'
									rel='noreferrer'
									className={styles.order_number}
								>
									№ {id}
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
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>№ п/п</th>
								<th>Наименование изделия</th>
								<th>Толщина металла, мм</th>
								<th>Кол-во, шт</th>
								<th>Стоимость, руб.</th>
							</tr>
						</thead>
						<tbody>
							{details?.map((detail, index) => (
								<ClientTable
									key={index}
									details={detail}
									index={index}
								/>
							))}
							{orders?.delivery === true ? (
								<tr>
									<td colSpan={4}>
										<strong>Доставка</strong>
									</td>
									<td>
										<strong>{deliveryCost}</strong>
									</td>
								</tr>
							) : (
								<></>
							)}
							<tr>
								<td colSpan={4}>
									<strong>Итого стоимость по заказу</strong>
								</td>
								<td>
									<strong>
										{deliveryCost
											? (
													total.price + deliveryCost
											  ).toFixed(1)
											: total.price.toFixed(1)}
									</strong>
								</td>
							</tr>
						</tbody>
					</Table>

					<div className={styles.invoice_header}>
						<p>
							<strong>Товарная накладная №{id}</strong>
						</p>
						<p>
							<strong>Покупатель:</strong> {orders?.customer}
						</p>
					</div>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>№ п/п</th>
								<th>Наименование изделия</th>
								<th>Толщина металла, мм</th>
								<th>Ед. изм.</th>
								<th>Кол-во</th>
							</tr>
						</thead>
						<tbody>
							{details?.map((detail, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{detail.name}</td>
									<td>{detail.thickness}</td>
									<td>шт.</td>
									<td>{detail.quantity}</td>
								</tr>
							))}
							<tr>
								<td colSpan={3}>
									<strong>Итого по заказу</strong>
								</td>
								<td>шт.</td>
								<td>
									<strong>{total.quantity}</strong>
								</td>
							</tr>
							{orders?.delivery === true ? (
								<tr>
									<td colSpan={3}>
										<strong>Доставка</strong>
									</td>
									<td colSpan={2}>
										<strong>{deliveryCost} руб</strong>
									</td>
								</tr>
							) : (
								<></>
							)}
							<tr>
								<td>
									<strong>Общий вес:</strong>
								</td>
								<td>
									<strong>
										{total.weight.toFixed(3)} кг
									</strong>
								</td>
								<td>
									<strong>Сумма:</strong>
								</td>
								<td colSpan={2}>
									<strong>
										{deliveryCost
											? (
													total.price + deliveryCost
											  ).toFixed(1)
											: total.price.toFixed(1)}{' '}
										руб
									</strong>
								</td>
							</tr>
						</tbody>
					</Table>

					<div className={styles.signatures}>
						<div className={styles.top}>
							<p>
								<strong>
									<i>Акт приема-передачи изделий</i>
								</strong>
							</p>
							<p>
								Я, <span></span> заказанные изделия получил в
								полном объеме, в установленный срок, к качеству
								претензий не имею.
							</p>
						</div>
						<div className={styles.blocks}>
							<p>
								Заказчик <span></span>
							</p>
							<p>
								Выдал <span></span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
