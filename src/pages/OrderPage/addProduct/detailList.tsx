import { useEffect } from 'react'
import { AddProduct, Detail, Order } from '../../../models'
import { CreateDetailGroupList } from '../detailList/createDetailGroupList'
import { OneDetail } from './oneDetail'

type DetailListProps = {
	order: Order
	setArrProduct: React.Dispatch<React.SetStateAction<AddProduct>>
}

export function DetailList({ order, setArrProduct }: DetailListProps) {
	let details: Detail[] = CreateDetailGroupList(order)

	return (
		<>
			{details.map(detail => (
				<OneDetail
					key={detail.id}
					detail={detail}
					setArrProduct={setArrProduct}
				/>
			))}
		</>
	)
}
