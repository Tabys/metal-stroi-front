import { Order } from '../../../../models'
import style from './style.module.css'
import { WorkshopProductItem } from './WorkshopProductItem'

type DelWorkshopProductProp = {
	order: Order
	onDel: () => void
}

export function DelWorkshopProduct({ order, onDel }: DelWorkshopProductProp) {
	order.workshops_products?.sort((a, b) => (a.id > b.id ? 1 : -1))
	return (
		<div className={style.suffix_form}>
			{order.workshops_products?.map((workshop_product, index) => (
				<WorkshopProductItem key={workshop_product.id} workshop_product={workshop_product} onDel={onDel} />
			))}
		</div>
	)
}
