import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../../../../hooks/prepareDataList'
import { CreateDetailGroupList } from '../../../LaserWorkshop/detailList/createDetailGroupList'
import { PrepArrDetails } from '../components/prepArrDetails/prepArrDetails'
import { DocTableDetail } from '../../../../../models'
import styles from '../style.module.css'
import Table from 'react-bootstrap/Table'
import { CulcTotalData } from '../components/culcTotalData'
import { SpecDetailTable } from './specDetailTable'
import { PrepArrProducts } from '../components/prepArrProducts'
import { SpecProductTable } from './specProductTable'
import { CulcColSpan } from './culcColSpan'
import { useState } from 'react'

export function DocSpecialization() {
	const [showTable, setShowTable] = useState(false)
	const { id } = useParams()
	const { orders } = useOrders({ id: id ? id : '', free: false })

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
	const colSpan = CulcColSpan(total)

	return (
		<>
			<div className='container doc-container'>
				<Link to='..' relative='path' className='back-link'>
					Вернуться назад
				</Link>
				<div className={styles.doc + ' ' + styles.full}>
					<div className='row g-2'>
						<div className={styles.doc_header}>
							<div className={styles.order_inf}>
								<p className={styles.order_number}>Спецификации</p>
							</div>
						</div>
					</div>

					<p className={styles.mini_header}>Детали:</p>
					<div>
						<button className='btn btn-primary mb-3 ' onClick={e => setShowTable(!showTable)}>
							{showTable === true ? 'Скрыть стоимость' : 'Показать стоимость'}
						</button>
					</div>
					<Table bordered hover className='narrow_cells'>
						<thead>
							<tr>
								<th rowSpan={2}>№ п/п</th>
								<th rowSpan={2}>
									Толщина
									<br /> металла, мм
								</th>
								<th rowSpan={2} className={styles.spec_name}>
									Наименование изделия
								</th>
								<th className={showTable === true ? '' : styles.hideTable} colSpan={colSpan}>
									Стоимость ед., руб
								</th>
								<th rowSpan={2}>Итого за ед, руб.</th>
								<th rowSpan={2}>Кол-во дет, шт</th>
								<th rowSpan={2}>Вес детали</th>
							</tr>
							<tr className={showTable === true ? '' : styles.hideTable}>
								{Number(total.cuting_plasma) > 0 ? <th>резка плазма</th> : ''}
								{Number(total.cuting_laser) > 0 ? <th>резка лазер</th> : ''}
								{Number(total.choping) > 0 ? <th>рубка</th> : ''}
								{Number(total.bending) > 0 ? <th>гибка</th> : ''}
								{Number(total.painting) > 0 ? <th>п/п</th> : ''}

								{Number(total.rolling) > 0 ? <th>вальцы</th> : ''}

								{Number(total.drowing) > 0 ? <th>чертёж</th> : ''}

								<th>металл</th>
							</tr>
						</thead>
						<tbody>
							{details?.map((detail, index) => (
								<SpecDetailTable key={index} detail={detail} index={index} total={total} delivery={total.oneKgDelivery} showTable={showTable} />
							))}

							<tr className={styles.footer}>
								<td></td>
								<td></td>
								<td></td>
								{Number(total.cuting_plasma) > 0 ? (
									<td className={showTable === true ? styles.center : styles.hideTable}>{total.cuting_plasma_all.toFixed(2)}</td>
								) : (
									''
								)}
								{Number(total.cuting_laser) > 0 ? (
									<td className={showTable === true ? styles.center : styles.hideTable}>{total.cuting_laser_all.toFixed(2)}</td>
								) : (
									''
								)}
								{Number(total.choping) > 0 ? (
									<td className={showTable === true ? styles.center : styles.hideTable}>{total.choping_all.toFixed(2)}</td>
								) : (
									''
								)}
								{Number(total.bending) > 0 ? (
									<td className={showTable === true ? styles.center : styles.hideTable}>{total.bending_all.toFixed(2)}</td>
								) : (
									''
								)}
								{Number(total.painting) > 0 ? (
									<td className={showTable === true ? styles.center : styles.hideTable}>{total.painting_all.toFixed(2)}</td>
								) : (
									''
								)}

								{Number(total.rolling) > 0 ? (
									<td className={showTable === true ? styles.center : styles.hideTable}>{total.rolling_all.toFixed(2)}</td>
								) : (
									''
								)}

								{Number(total.drowing) > 0 ? (
									<td className={showTable === true ? styles.center : styles.hideTable}>{total.drowing.toFixed(2)}</td>
								) : (
									''
								)}
								<td className={showTable === true ? styles.center : styles.hideTable}>{total.metal_all.toFixed(2)}</td>
								<td></td>
								<td className={styles.center}>{total.quantity - total.prod_quantity}</td>
								<td></td>
							</tr>
						</tbody>
					</Table>

					<p className={styles.mini_header}>Изделия:</p>
					{products! && products?.length > 0 ? (
						<Table bordered hover className='narrow_cells'>
							<thead>
								<tr>
									<th>№ п/п</th>
									<th>Наименование изделия</th>
									<th>Кол-во изд, шт</th>
									{total.prod_sm_works > 0 ? <th>Работы СМ</th> : ''}
									{total.prod_mk_works > 0 ? <th>Работы МК</th> : ''}
									{total.prod_smithy > 0 ? <th>Работы кузни</th> : ''}
									{total.prod_tfc_works > 0 ? <th>Работы ТФЦ</th> : ''}
									{total.prod_ac_works > 0 ? <th>Работы АЦ</th> : ''}
									{total.prod_painting > 0 ? <th>п/п</th> : ''}
									{total.prod_turning_works > 0 ? <th>Токарка</th> : ''}

									{total.prod_design_department > 0 ? <th>Конструкторский отдел</th> : ''}

									<th>Итого за ед, руб.</th>
									<th>Вес деталей</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product, index) => (
									<SpecProductTable key={index} product={product} total={total} index={index} delivery={total.oneKgDelivery} />
								))}
								<tr className={styles.footer}>
									<td></td>
									<td></td>
									<td className={styles.center}>{total.prod_quantity}</td>
									{total.prod_sm_works > 0 ? <td className={styles.center}>{total.prod_sm_works.toFixed(2)}</td> : ''}
									{total.prod_mk_works > 0 ? <td className={styles.center}>{total.prod_mk_works.toFixed(2)}</td> : ''}
									{total.prod_smithy > 0 ? <td className={styles.center}>{total.prod_smithy.toFixed(2)}</td> : ''}
									{total.prod_tfc_works > 0 ? <td className={styles.center}>{total.prod_tfc_works.toFixed(2)}</td> : ''}
									{total.prod_ac_works > 0 ? <td className={styles.center}>{total.prod_ac_works.toFixed(2)}</td> : ''}
									{total.prod_painting > 0 ? <td className={styles.center}>{total.prod_painting.toFixed(2)}</td> : ''}
									{total.prod_turning_works > 0 ? <td className={styles.center}>{total.prod_turning_works.toFixed(2)}</td> : ''}
									{total.prod_design_department > 0 ? <td className={styles.center}>{total.prod_design_department.toFixed(2)}</td> : ''}
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</Table>
					) : (
						'Изделий нет'
					)}
					<div className={styles.total}>
						<p>
							Итого: <strong>{total.price.toFixed(2)}</strong>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
