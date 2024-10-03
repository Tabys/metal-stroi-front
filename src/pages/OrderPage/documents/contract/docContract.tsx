import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../../../hooks/prepareDataList'
import { CreateDetailGroupList } from '../../detailList/createDetailGroupList'
import { PrepArrDetils } from '../components/prepArrDetails/prepArrDetails'
import { DocTableDetail } from '../../../../models'
import styles from '../style.module.css'
import Table from 'react-bootstrap/Table'
import { CulcTotalData } from '../components/culcTotalData'
import { PrepArrProducts } from '../components/prepArrProducts'
import { ContractWorkTableDetail } from './contractWorkTableDetails'
import { ContractWorkTableProduct } from './contractWorkTableProducts'
import { ContractShipmentTableDetails } from './contractShipmentTableDetails'
import { ContractShipmentTableProducts } from './contractShipmentTableProducts'
import { useUser } from '../../../../hooks/curentUser'
import { getVat } from './getVat'

export function DocContract() {
	const { id } = useParams()
	const { orders } = useOrders(id ? id : '')
	const { currentUser } = useUser()
	const vat = getVat(orders)

	const arrDetails = orders ? CreateDetailGroupList(orders) : undefined
	const details: DocTableDetail[] | undefined = PrepArrDetils({
		arrDetails,
		orders,
	})
	const products = PrepArrProducts(orders)
	const total = CulcTotalData({ details, products, orders })
	return (
		<>
			<div className='container'>
				{currentUser ? (
					<Link to='..' relative='path' className='back-link'>
						Вернуться назад
					</Link>
				) : (
					''
				)}
				<div
					className={
						styles.doc + ' ' + styles.full + ' ' + styles.contract
					}
				>
					<h3>Спецификация к договору на выполнение РАБОТ</h3>
					<Table bordered hover>
						<thead>
							<tr>
								<td rowSpan={2}>№ п/п</td>
								<td rowSpan={2}>
									Наименование результата Работ (изделия)
								</td>
								<td rowSpan={2}>Толщина металла, мм</td>
								<td colSpan={6}>Стоимость работ, руб.</td>
								<td rowSpan={2}>Итого за ед., в руб. {vat}</td>
								<td rowSpan={2}>Кол-во, шт</td>
								<td rowSpan={2}>Итого, в руб. {vat}</td>
								<td rowSpan={2}>Вес за шт.</td>
							</tr>
							<tr>
								<td>резка</td>
								<td>рубка</td>
								<td>мех.обработка</td>
								<td>гибка</td>
								<td>окрашивание</td>
								<td>сварка</td>
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
								<td colSpan={10}>Итого:</td>
								<td>{total.quantity}</td>
								<td>{total.price}</td>
								<td>{total.weight.toFixed(3)}</td>
							</tr>
						</tbody>
					</Table>

					<div className={styles.gap}></div>
					<h3>Спецификация к договору ПОСТАВКИ</h3>

					<Table bordered hover>
						<thead>
							<tr>
								<td>№ п/п</td>
								<td>Толщина металла, мм</td>
								<td>Наименование изделия</td>
								<td>Цена за ед., руб. {vat}</td>
								<td>Кол-во</td>
								<td>Итого, руб. {vat}</td>
							</tr>
						</thead>
						<tbody>
							{details?.map((detail, index) => (
								<ContractShipmentTableDetails
									key={detail.id}
									detail={detail}
									index={index}
									delivery={total.oneKgDelivery}
								/>
							))}
							{products?.map((product, index) => (
								<ContractShipmentTableProducts
									key={product.id + index}
									details={details}
									product={product}
									index={index}
									delivery={total.oneKgDelivery}
								/>
							))}
							<tr>
								<td colSpan={4}>Итого:</td>
								<td>{total.quantity}</td>
								<td>{total.price}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</div>
		</>
	)
}
