import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../../../hooks/prepareDataList'
import { CreateDetailGroupList } from '../../detailList/createDetailGroupList'
import { PrepArrDetils } from '../components/prepArrDetails/prepArrDetails'
import { DocTableDetail } from '../../../../models'
import styles from '../style.module.css'
import Table from 'react-bootstrap/Table'
import { PrepArrProducts } from '../components/prepArrProducts'
import { PaintingTable } from './paintingTable'
import { PaintingTableProducts } from './paintingTableProducts'
import { culcProductIndex } from './culcProductIndex'

export function DocPainting() {
	const { id } = useParams()
	const { orders } = useOrders(id ? id : '')
	const linkBX = process.env.REACT_APP_BX24_URL + `crm/deal/details/${id}/`

	const arrDetails = orders ? CreateDetailGroupList(orders) : undefined
	const details: DocTableDetail[] | undefined = PrepArrDetils({
		arrDetails,
		orders,
	})
	const products = PrepArrProducts(orders)
	const productIndex = culcProductIndex(details)

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
									Заявка в цех ПП № {orders?.order_number}
								</a>
								<p>
									<strong>Заказчик:</strong>{' '}
									{orders?.customer}
								</p>
							</div>
						</div>
					</div>
					<Table bordered hover>
						<thead>
							<tr>
								<th>№ п/п</th>
								<th>Наименование изделия</th>
								<th>Кол-во, шт</th>
								<th>Цвет</th>
								<th>Объем</th>
								<th>Стоимость</th>
							</tr>
						</thead>
						<tbody>
							{details?.map((detail, index) =>
								detail.painting ? (
									<PaintingTable
										key={detail.id}
										detail={detail}
										index={index}
									/>
								) : (
									''
								)
							)}
							{products?.map((product, index) =>
								product.painting_cost ? (
									<PaintingTableProducts
										key={product.id}
										index={index}
										product={product}
										startIndex={productIndex}
									/>
								) : (
									''
								)
							)}
						</tbody>
					</Table>
				</div>
			</div>
		</>
	)
}
