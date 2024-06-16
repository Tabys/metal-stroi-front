import { Order } from '../../../models'
import { FormProductList } from './formProductList'
import styles from './styles.module.css'

type detailListProps = {
	dataOrder: Order
	delProduct: () => void
}

export function ProductList({ dataOrder, delProduct }: detailListProps) {
	return (
		<div className={styles.wrapper_table + ' ' + styles.product_table}>
			<h2>Изделия</h2>
			{dataOrder.products?.length ? (
				<div className={styles.detail_list}>
					<table>
						<thead>
							<tr>
								<td rowSpan={2}>№</td>
								<td rowSpan={2}>Наименование изделия</td>
								<td rowSpan={2}>Количество изделий</td>
								<td colSpan={9}>Сварка</td>
								<td colSpan={3}>Полимерка</td>
								<td rowSpan={2}>Кузня</td>
								<td rowSpan={2}>Токарка</td>
								<td rowSpan={2}>Конструкторский отдел</td>
								<td rowSpan={2}></td>
							</tr>
							<tr>
								<td>Работа</td>
								<td>Метизы</td>
								<td>Прибыль</td>
								<td>Налог</td>
								<td>Прокат</td>
								<td>Покраска</td>
								<td>Доставка</td>
								<td>Монтаж</td>
								<td>Команд.</td>
								<td>Цвет</td>
								<td>Цена за м2</td>
								<td>Стоимость</td>
							</tr>
						</thead>
					</table>

					<FormProductList
						products={dataOrder.products}
						orderData={dataOrder}
						delProduct={delProduct}
					/>
				</div>
			) : (
				'Изделий нет'
			)}
		</div>
	)
}
