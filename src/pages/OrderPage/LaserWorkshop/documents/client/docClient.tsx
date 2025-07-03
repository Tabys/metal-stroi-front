import { useParams } from 'react-router-dom'
import { useOrders } from '../../../../../hooks/prepareDataList'
import { CreateDetailGroupList } from '../../../LaserWorkshop/detailList/createDetailGroupList'
import { PrepArrDetails } from '../components/prepArrDetails/prepArrDetails'
import { ClientTable } from './clientTable'
import { DocTableDetail } from '../../../../../models'
import styles from '../style.module.css'
import Table from 'react-bootstrap/Table'
import { TransformDate } from '../../../../../components/TransformDate'
import { CulcTotalData } from '../components/culcTotalData'
import { ClientTableProducts } from './clientTableProducts'
import { PrepArrProducts } from '../components/prepArrProducts'

export function DocClient() {
	const { id } = useParams()
	const { orders } = useOrders({ id: id ? id : '', free: false })
	const linkBX = process.env.REACT_APP_BX24_URL + `crm/deal/details/${id}/`

	const arrDetails = orders ? CreateDetailGroupList({ dataOrder: orders, free: true }) : undefined
	const details: DocTableDetail[] | undefined = PrepArrDetails({
		arrDetails,
		order: orders,
	})
	const editedDetailsFull: DocTableDetail[] | undefined = PrepArrDetails({
		arrDetails: CreateDetailGroupList({ dataOrder: orders, free: true }),
		order: orders,
		full: true,
	})
	const products = PrepArrProducts({ order: orders, full_details: editedDetailsFull })
	const total = CulcTotalData({ details, full_details: editedDetailsFull, products, orders })

	details?.sort((a, b) => a.name.localeCompare(b.name))
	products?.sort((a, b) => a.name.localeCompare(b.name))

	return (
		<>
			<div className={styles.doc}>
				<div className='row g-2'>
					<div className={styles.doc_header}>
						<div className={styles.compony_inf}>
							<div className={styles.logo}>
								<img src='/images/logoMS.png' alt='logo' />
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
							<a href={linkBX} target='_blank' rel='noreferrer' className={styles.order_number}>
								№ {String(String(orders?.order_number).split('_')[0]).split('_')[0]}
							</a>
							<p>
								<strong>Дата приема заказа:</strong> <TransformDate orderDate={orders?.date_create} />
							</p>
							<p>
								<strong>Заказчик:</strong> {orders?.customer}
							</p>
							<p>
								<strong>Срок изготовления заказа:</strong> {orders?.production_time} рабочих дней
							</p>
						</div>
					</div>
				</div>
				<Table bordered hover className='narrow_cells client'>
					<thead>
						<tr>
							<th>
								№<br />
								п/п
							</th>
							<th className='full'>Наименование изделия</th>
							<th>
								Толщина
								<br />
								металла, мм
							</th>
							<th>Кол-во, шт</th>
							<th>Стоимость, руб.</th>
						</tr>
					</thead>
					<tbody>
						{details?.map((detail, index) => (
							<ClientTable key={detail.id} detail={detail} editedDetailsFull={editedDetailsFull} index={index} delivery={total.oneKgDelivery} />
						))}
						{products?.map((product, index) => (
							<ClientTableProducts key={product.id} index={index} product={product} startIndex={details?.length} delivery={total.oneKgDelivery} />
						))}
						<tr>
							<td colSpan={4}>
								<strong>Итого стоимость по заказу</strong>
							</td>
							<td>
								<strong>{total.price.toFixed(2)}</strong>
							</td>
						</tr>
					</tbody>
				</Table>
				{/* {Number(details?.length) + Number(products?.length) > 5 ? <div className='page_brake'></div> : ''} */}
				<div className={styles.invoice_header}>
					<p>
						<strong>Товарная накладная №{String(orders?.order_number).split('_')[0]}</strong>
					</p>
					<p>
						<strong>Покупатель:</strong> {orders?.customer}
					</p>
				</div>
				<Table bordered hover className='narrow_cells client'>
					<thead>
						<tr>
							<th>
								№<br />
								п/п
							</th>
							<th className='full'>Наименование изделия</th>
							<th>
								Толщина
								<br />
								металла, мм
							</th>
							<th>Ед. изм.</th>
							<th>Кол-во</th>
						</tr>
					</thead>
					<tbody>
						{details?.map((detail, index) => (
							<tr key={detail.id}>
								<td className={styles.center}>{index + 1}</td>
								<td className={styles.left}>{detail.name}</td>
								<td className={styles.center}>
									{detail.thickness} {detail.material} {detail.suffixes} {detail.customers_metal ? 'зак' : ''}
								</td>
								<td className={styles.center}>шт.</td>
								<td className={styles.center}>{detail.quantity}</td>
							</tr>
						))}
						{orders?.products?.map((product, index) => (
							<tr className={index === 0 ? 'borderBold' : ''} key={product.id}>
								<td className={styles.center}>{details?.length ? index + 1 + details.length : 0}</td>
								<td className={styles.left}>{product.name}</td>
								<td className={styles.center}>-</td>
								<td className={styles.center}>шт.</td>
								<td className={styles.center}>{product.quantity}</td>
							</tr>
						))}
						<tr>
							<td colSpan={3}>
								<strong>Итого по заказу</strong>
							</td>
							<td className={styles.center}>шт.</td>
							<td className={styles.center}>
								<strong>{total.quantity}</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>Общий вес:</strong>
							</td>
							<td>
								<strong>{total.weight.toFixed(2)} кг</strong>
							</td>
							<td>
								<strong>Сумма:</strong>
							</td>
							<td colSpan={2} className={styles.center}>
								<strong>{total.price.toFixed(2)} руб</strong>
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
							Давальческий металл хранится в течение 10 дней после забора заказа. По истечении срока хранения, мы не несём ответственность за
							сохранность качества металла.
						</p>
						<p>
							Я, <span></span> заказанные изделия получил в полном объеме, в установленный срок, к качеству претензий не имею.
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
		</>
	)
}
