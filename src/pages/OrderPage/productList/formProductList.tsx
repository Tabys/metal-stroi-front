import { DocTableDetail, Order, PaintingMods, Product } from '../../../models'
import { FormProductItem } from './formProductItem'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import { PrepArrProducts } from '../documents/components/prepArrProducts'
import { CreateDetailGroupList } from '../detailList/createDetailGroupList'
import { PrepArrDetails } from '../documents/components/prepArrDetails/prepArrDetails'
import { CulcTotalData } from '../documents/components/culcTotalData'

interface FormProps {
	orderData: Order
	products: Product[] | undefined
	paintingMods: PaintingMods[]
	delProduct: () => void
	updData: () => void
}

export function FormProductList({ products, orderData, paintingMods, delProduct, updData }: FormProps) {
	const arrDetails = orderData ? CreateDetailGroupList(orderData) : undefined
	const details: DocTableDetail[] | undefined = PrepArrDetails({
		arrDetails,
		orders: orderData,
	})
	const editedProducts = PrepArrProducts(orderData)
	const total = CulcTotalData({ details, products: editedProducts, orders: orderData })

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
			<Alert className='alert-fixed' show={alertShow} variant={error ? 'danger' : 'success'}>
				{error ? error : 'Изменения сохранены'}
			</Alert>
		</>
	)
}
