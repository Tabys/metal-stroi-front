import { Order, Product } from '../../../models'
import { FormProductItem } from './formProductItem'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'

interface FormProps {
	orderData: Order
	products: Product[] | undefined
	delProduct: () => void
}

export function FormProductList({
	products,
	orderData,
	delProduct,
}: FormProps) {
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
					setError={setError}
					updProduct={openAlert}
					orderData={orderData}
					productItem={item}
					delProduct={delProduct}
					index={index}
					key={item.id}
				/>
			))}
			<Alert
				className='alert-fixed'
				show={alertShow}
				variant={error ? 'danger' : 'success'}
			>
				{error ? error : 'Изменения сохранены'}
			</Alert>
		</>
	)
}
