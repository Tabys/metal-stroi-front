import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../../../../hooks/prepareDataList'
import styles from '../style.module.css'
import Table from 'react-bootstrap/Table'
import { PaintingTableWorkshops } from './PaintingTableWorkshops'
import { usePaintingMods } from '../../../../../hooks/paintingMods'
import { workshopOrderTotalData } from '../../workshopTotalData/workshopOrderTotalData'

export function DocPaintingWorkshops() {
	const { id } = useParams()
	const { paintingMods } = usePaintingMods()
	const { orders } = useOrders(id ? id : '')
	const linkBX = process.env.REACT_APP_BX24_URL + `crm/deal/details/${id}/`

	const products = orders?.workshops_products?.filter(product => product.polymer_price > 0)

	const total = workshopOrderTotalData({
		products: orders?.workshops_products,
		workshopData: orders?.workshops_data,
	})

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
								<a href={linkBX} target='_blank' rel='noreferrer' className={styles.order_number}>
									Заявка в цех ПП № {orders?.order_number}
								</a>
								<p>
									<strong>Заказчик:</strong> {orders?.customer}
								</p>
							</div>
						</div>
					</div>
					{total.polymer > 0 ? (
						<Table bordered hover className='narrow_cells'>
							<thead>
								<tr>
									<th>№ п/п</th>
									<th>Наименование изделия</th>
									<th>Кол-во, шт</th>
									<th>Цвет</th>
									<th>Стоимость</th>
								</tr>
							</thead>
							<tbody>
								{products?.map((product, index) => (
									<PaintingTableWorkshops key={product.id} product={product} index={index} paintingMods={paintingMods} />
								))}
							</tbody>
						</Table>
					) : (
						<p>Нет изделий для покраски</p>
					)}
				</div>
			</div>
		</>
	)
}
