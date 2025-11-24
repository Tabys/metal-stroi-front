import Tooltip from '../../../../components/Tooltip'
import { Order, PaintingMods, ProductsFull, TotalData } from '../../../../models'
import { ControlPanelProducts } from '../detailList/component/controlPanelProducts/controlPanelProducts'
import { PPHint } from '../detailList/component/ppHint/ppHint'
import { FormProductList } from './formProductList'
import styles from './styles.module.css'

type detailListProps = {
	dataOrder: Order
	editedProducts?: ProductsFull[]
	paintingMods: PaintingMods[]
	total: TotalData
	delProduct: () => void
	updData: () => void
}

export function ProductList({ dataOrder, editedProducts, paintingMods, total, delProduct, updData }: detailListProps) {
	return (
		<div className={styles.wrapper_table + ' ' + styles.product_table}>
			<h2>Изделия</h2>
			{dataOrder.products?.length ? (
				<div className={styles.detail_list}>
					<table>
						<thead>
							<tr>
								<td>№</td>
								<td>Наименование изделия</td>
								<td className={styles.small}>
									<img src='/images/header-table/numbers-min.png' alt='quantity' />
									<p>Количество изделий, шт</p>
								</td>
								<td className={styles.small}>
									<img src='/images/header-table/detail_list.png' alt='quantity' />
									<p>Детали, входящие в изделие</p>
								</td>
								<td className={styles.small}>
									<img src='/images/header-table/mk_works.png' alt='quantity' />
									<p>Работы МК</p>
								</td>
								<td className={styles.small}>
									<img src='/images/header-table/tfc_works.png' alt='quantity' />
									<p>Работы ТФЦ</p>
								</td>
								<td className={styles.small}>
									<img src='/images/header-table/ac_works.png' alt='quantity' />
									<p>Работы АЦ</p>
								</td>
								<td className={styles.small}>
									<img src='/images/header-table/turning_works.png' alt='quantity' />
									<p>Токарные работы</p>
								</td>
								<td className={styles.small}>
									<img src='/images/header-table/color-palette-min.png' alt='pp-color' />
									<p>Цвет ПП</p>
								</td>
								<Tooltip conditions={true} text={<PPHint paintingMods={paintingMods} />}>
									<td className={styles.small}>
										<img src='/images/header-table/free-icon-options-8129628-min.png' alt='pp-options' />
										<p>Опции ПП</p>
									</td>
								</Tooltip>
								{/* <td>Цена за м2</td> */}
								<td className={styles.small}>
									<img src='/images/header-table/ruble-min.png' alt='pp-price' />
									<p>Цена за изделие</p>
								</td>
								<td className={styles.small}>
									<img src='/images/header-table/design_departure.png' alt='pp-price' />
									<p>Работы КО</p>
								</td>
								<td className={styles.small}>
									<img src='/images/header-table/free-icon-money-bag-5584203-min.png' alt='cost' />
									<p>Стоимость</p>
								</td>
								<td></td>
							</tr>
						</thead>
					</table>

					<ControlPanelProducts orderData={dataOrder} update={updData} paintingMods={paintingMods} />

					<FormProductList
						editedProducts={editedProducts}
						total={total}
						products={dataOrder.products}
						orderData={dataOrder}
						delProduct={delProduct}
						updData={updData}
						paintingMods={paintingMods}
					/>
				</div>
			) : (
				'Изделий нет'
			)}
		</div>
	)
}
