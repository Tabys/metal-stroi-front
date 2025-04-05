import { Product, ProductsFull } from '../../../../models'

type culcCostProductProp = {
	products: Product
	editProducts: ProductsFull[] | undefined
	delivery: number
}

export function culcCostProduct({ products, editProducts, delivery }: culcCostProductProp) {
	let cost = 0
	const oneEditeProduct = editProducts?.find(product => product.id === products.id)
	if (oneEditeProduct) {
		cost = Math.ceil(oneEditeProduct.totalPrice + delivery * Number(oneEditeProduct.weight))
	}
	return cost
}
