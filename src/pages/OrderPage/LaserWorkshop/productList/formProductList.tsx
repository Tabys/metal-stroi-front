import { Order, PaintingMods, Product, ProductsFull, TotalData } from '../../../../models'
import { FormProductItem } from './formProductItem'
import Alert from 'react-bootstrap/Alert'
import styles from './styles.module.css'
import { useState } from 'react'

interface FormProps {
	orderData: Order
	products: Product[] | undefined
	editedProducts?: ProductsFull[]
	total: TotalData
	paintingMods: PaintingMods[]
	delProduct: () => void
	updData: () => void
}

export function FormProductList({ products, editedProducts, total, orderData, paintingMods, delProduct, updData }: FormProps) {
	products?.sort((a, b) => (a.id > b.id ? 1 : -1))

	const [alertShow, setAlertShow] = useState(false)
	const [error, setError] = useState()

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}
	return (
		<>
			{products?.map((item, index) => (
				<FormProductItem
					updData={updData}
					setError={setError}
					updProduct={openAlert}
					orderData={orderData}
					productItem={item}
					editedProducts={editedProducts}
					delivery={total.oneKgDelivery}
					delProduct={delProduct}
					paintingMods={paintingMods}
					index={index}
					key={item.id}
				/>
			))}
			<table className={styles.table_total}>
				<tbody>
					<tr>
						<td colSpan={4} className={styles.text_right}>
							Итого:
						</td>
						<td className={styles.text_right}>{total.prod_sm_works}</td>
						<td className={styles.text_right}>{total.prod_mk_works}</td>
						<td className={styles.text_right}>{total.prod_smithy}</td>
						<td className={styles.text_right}>{total.prod_tfc_works}</td>
						<td className={styles.text_right}>{total.prod_ac_works}</td>
						<td className={styles.text_right}>{total.prod_turning_works}</td>
						<td></td>
						<td></td>
						<td className={styles.text_right}>{total.prod_painting}</td>
						<td className={styles.text_right}>{total.prod_design_department}</td>
						<td className={styles.text_right}>{/* {total.prod_price} */}</td>
						<td></td>
					</tr>
				</tbody>
			</table>

			<Alert className='alert-fixed' show={alertShow} variant={error ? 'danger' : 'success'}>
				{error ? error : 'Изменения сохранены'}
			</Alert>
		</>
	)
}
