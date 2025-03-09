import { Order, PaintingMods, Rates } from '../../../../models'
import { WorkshopProductItem } from './workshopProductItem'

type WorkshopProductsTableProps = {
	order?: Order
	rates: Rates[]
	paintingMods: PaintingMods[]
	allMaterialWeight: number
	onCreate: () => void
	openAlert: (type: string, massage?: string) => void
}

export function WorkshopProductsTable({ order, rates, paintingMods, allMaterialWeight, onCreate, openAlert }: WorkshopProductsTableProps) {
	return (
		<>
			{order?.workshops_products?.map(product => (
				<WorkshopProductItem
					paintingMods={paintingMods}
					allMaterialWeight={allMaterialWeight}
					key={product.id}
					rates={rates}
					product={product}
					workshopData={order.workshops_data}
					onCreate={onCreate}
					openAlert={openAlert}
				/>
			))}
		</>
	)
}
