import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../../../hooks/prepareDataList'
import { CreateDetailGroupList } from '../../detailList/createDetailGroupList'
import { PrepArrDetils } from '../components/prepArrDetails/prepArrDetails'
import { DocTableDetail } from '../../../../models'
import styles from '../style.module.css'
import Table from 'react-bootstrap/Table'
import { CulcTotalData } from '../components/culcTotalData'
import { SpecDetailTable } from './specDetailTable'
import { PrepArrProducts } from '../components/prepArrProducts'
import { SpecProductTable } from './specProductTable'
import { CulcColSpan } from './culcColSpan'

export function DocSpecialization() {
	const { id } = useParams()
	const { orders } = useOrders(id ? id : '')

	const arrDetails = orders ? CreateDetailGroupList(orders) : undefined
	const details: DocTableDetail[] | undefined = PrepArrDetils({
		arrDetails,
		orders,
	})
	const products = PrepArrProducts(orders)
	const total = CulcTotalData({ details, products })
	const colSpan = CulcColSpan(total)
	let deliveryCost: number | null = null
	if (orders?.delivery! && orders?.delivery > 0) {
		deliveryCost = orders?.delivery + Math.ceil(total.weight / 500) * 500
	}

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
								<p className={styles.order_number}>
									Спецификации
								</p>
							</div>
						</div>
					</div>
					<p className={styles.mini_header}>Детали:</p>
					<Table bordered hover>
						<thead>
							<tr>
								<th rowSpan={2}>№ п/п</th>
								<th rowSpan={2}>Толщина металла, мм</th>
								<th rowSpan={2}>Наименование изделия</th>
								<th colSpan={colSpan}>Стоимость ед., руб</th>
								<th rowSpan={2}>Итого за ед, руб.</th>
								<th rowSpan={2}>Кол-во дет, шт</th>
								<th rowSpan={2}>Вес детали</th>
							</tr>
							<tr>
								{Number(total.cuting_plasma) > 0 ? (
									<th>резка плазма</th>
								) : (
									''
								)}
								{Number(total.cuting_laser) > 0 ? (
									<th>резка лазер</th>
								) : (
									''
								)}
								{Number(total.choping) > 0 ? (
									<th>рубка</th>
								) : (
									''
								)}
								{Number(total.bending) > 0 ? (
									<th>гибка</th>
								) : (
									''
								)}
								{Number(total.painting) > 0 ? <th>п/п</th> : ''}

								{Number(total.rolling) > 0 ? (
									<th>вальцы</th>
								) : (
									''
								)}

								{Number(total.drowing) > 0 ? (
									<th>чертёж</th>
								) : (
									''
								)}

								<th>металл</th>
							</tr>
						</thead>
						<tbody>
							{details?.map((detail, index) => (
								<SpecDetailTable
									key={index}
									detail={detail}
									index={index}
									total={total}
								/>
							))}

							<tr className={styles.footer}>
								<td></td>
								<td></td>
								<td></td>
								{Number(total.cuting_plasma) > 0 ? (
									<td>{total.cuting_plasma}</td>
								) : (
									''
								)}
								{Number(total.cuting_laser) > 0 ? (
									<td>{total.cuting_laser}</td>
								) : (
									''
								)}
								{Number(total.choping) > 0 ? (
									<td>{total.choping}</td>
								) : (
									''
								)}
								{Number(total.bending) > 0 ? (
									<td>{total.bending}</td>
								) : (
									''
								)}
								{Number(total.painting) > 0 ? (
									<td>{total.painting}</td>
								) : (
									''
								)}

								{Number(total.rolling) > 0 ? (
									<td>{total.inset}</td>
								) : (
									''
								)}

								{Number(total.drowing) > 0 ? (
									<td>{total.drowing}</td>
								) : (
									''
								)}
								<td>{total.metal}</td>
								<td>{total.price - total.prod_price}</td>
								<td>{total.quantity - total.prod_quantity}</td>
								<td></td>
							</tr>
						</tbody>
					</Table>

					<p className={styles.mini_header}>Изделия:</p>
					{products! && products?.length > 0 ? (
						<Table bordered hover>
							<thead>
								<tr>
									<th>№ п/п</th>
									<th>Наименование изделия</th>
									<th>Кол-во изд, шт</th>
									{total.prod_welding > 0 ? (
										<th>Сварка</th>
									) : (
										''
									)}
									{total.prod_painting > 0 ? (
										<th>п/п</th>
									) : (
										''
									)}
									{total.prod_turning_works > 0 ? (
										<th>Токарка</th>
									) : (
										''
									)}
									{total.prod_smithy > 0 ? (
										<th>Кузня</th>
									) : (
										''
									)}
									{total.prod_design_department > 0 ? (
										<th>Конструкторский отдел</th>
									) : (
										''
									)}

									<th>Итого за ед, руб.</th>
									<th>Вес деталей</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product, index) => (
									<SpecProductTable
										key={index}
										product={product}
										total={total}
										index={index}
									/>
								))}
								<tr className={styles.footer}>
									<td></td>
									<td></td>
									<td>{total.prod_quantity}</td>
									{total.prod_welding > 0 ? (
										<td>{total.prod_welding}</td>
									) : (
										''
									)}
									{total.prod_painting > 0 ? (
										<td>{total.prod_painting}</td>
									) : (
										''
									)}
									{total.prod_turning_works > 0 ? (
										<td>{total.prod_turning_works}</td>
									) : (
										''
									)}
									{total.prod_smithy > 0 ? (
										<td>{total.prod_smithy}</td>
									) : (
										''
									)}
									{total.prod_design_department > 0 ? (
										<td>{total.prod_design_department}</td>
									) : (
										''
									)}
									<td>{total.prod_price}</td>
									<td></td>
								</tr>
							</tbody>
						</Table>
					) : (
						'Изделий нет'
					)}
					<div className={styles.total}>
						<p>
							Стоимость доставки:{' '}
							<strong>
								{deliveryCost
									? deliveryCost?.toFixed(2)
									: '0.00'}
							</strong>
						</p>
						<p>
							Итого: <strong>{total.price.toFixed(2)}</strong>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
