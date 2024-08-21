import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../../../hooks/prepareDataList'
import { CreateDetailGroupList } from '../../detailList/createDetailGroupList'
import { PrepArrDetils } from '../components/prepArrDetails/prepArrDetails'
import { DocTableDetail } from '../../../../models'
import styles from '../style.module.css'
import Table from 'react-bootstrap/Table'
import { TransformDate } from '../../../../components/TransformDate'
import { CulcTotalData } from '../components/culcTotalData'
import { PrepArrProducts } from '../components/prepArrProducts'
import { ContractWorkTableDetail } from './contractWorkTableDetails'
import { CulcColSpan } from './culcColSpan'
import { ContractWorkTableProduct } from './contractWorkTableProducts'
import { ContractShipmentTableDetails } from './contractShipmentTableDetails'
import { ContractShipmentTableProducts } from './contractShipmentTableProducts'

export function DocContract() {
	const { id } = useParams()
	const { orders } = useOrders(id ? id : '')
	const linkBX = process.env.REACT_APP_BX24_URL + `crm/deal/details/${id}/`

	const arrDetails = orders ? CreateDetailGroupList(orders) : undefined
	const details: DocTableDetail[] | undefined = PrepArrDetils({
		arrDetails,
		orders,
	})
	const products = PrepArrProducts(orders)
	const total = CulcTotalData({ details, products, orders })
	const colSpan = CulcColSpan(total)
	console.log(colSpan)

	return (
		<>
			<div className='container'>
				<Link to='..' relative='path' className='back-link'>
					Вернуться назад
				</Link>
				<div className={styles.doc + ' ' + styles.full}>
					<h3>Спецификация к договору на выполнение РАБОТ</h3>
					<Table bordered hover>
						<thead>
							<tr>
								<th rowSpan={2}>№ п/п</th>
								<th rowSpan={2}>
									Наименование результата Работ (изделия)
								</th>
								<th rowSpan={2}>Толщина металла, мм</th>
								<th colSpan={colSpan}>Стоимость работ, руб.</th>
								<th rowSpan={2}>
									Итого за ед., в руб., (НДС не облагается)
								</th>
								<th rowSpan={2}>Кол-во, шт</th>
								<th rowSpan={2}>
									Итого, в руб. (НДС не облагается)
								</th>
								<th rowSpan={2}>Вес за шт.</th>
							</tr>
							<tr>
								{Number(total.cuting_laser) > 0 ||
								Number(total.cuting_plasma) > 0 ? (
									<th>резка</th>
								) : (
									''
								)}
								{total.choping > 0 ? <th>рубка</th> : ''}
								{total.prod_turning_works > 0 ? (
									<th>токарные работы</th>
								) : (
									''
								)}
								{total.bending > 0 ? <th>гибка</th> : ''}
								{Number(total.prod_painting) > 0 ? (
									<th>окрашивание</th>
								) : (
									''
								)}
								{total.prod_welding > 0 ? <th>сварка</th> : ''}
							</tr>
						</thead>
						<tbody>
							{details?.map((detail, index) => (
								<ContractWorkTableDetail
									key={detail.id}
									detail={detail}
									total={total}
									index={index}
									delivery={total.oneKgDelivery}
								/>
							))}
							{products?.map((product, index) => (
								<ContractWorkTableProduct
									key={product.id}
									index={index}
									product={product}
									total={total}
									startIndex={details?.length}
									delivery={total.oneKgDelivery}
								/>
							))}
							<tr>
								<td colSpan={colSpan + 4}>
									<strong>Итого:</strong>
								</td>
								<td>
									<strong>{total.quantity}</strong>
								</td>
								<td>
									<strong>{total.price}</strong>
								</td>
								<td>
									<strong>{total.weight}</strong>
								</td>
							</tr>
						</tbody>
					</Table>

					<div className={styles.gap}></div>
					<h3>Спецификация к договору ПОСТАВКИ</h3>

					<Table bordered hover>
						<thead>
							<tr>
								<th>№ п/п</th>
								<th>Толщина металла, мм</th>
								<th>Наименование изделия</th>
								<th>Цена за ед., руб., НДС не облагается</th>
								<th>Кол-во</th>
								<th>Итого, руб., НДС не облагается</th>
							</tr>
						</thead>
						<tbody>
							{details?.map((detail, index) => (
								<ContractShipmentTableDetails
									detail={detail}
									index={index}
								/>
							))}
							{products?.map((product, index) => (
								<ContractShipmentTableProducts
									details={details}
									product={product}
									index={index}
								/>
							))}
							<tr>
								<td colSpan={4}>
									<strong>Итого:</strong>
								</td>
								<td>
									<strong>{total.quantity}</strong>
								</td>
								<td>
									<strong>{total.price}</strong>
								</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</div>
		</>
	)
}
