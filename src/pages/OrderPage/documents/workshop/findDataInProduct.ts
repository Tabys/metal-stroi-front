import { DocTableDetail } from '../../../../models'

type findDataInProductsProps = {
	detail: DocTableDetail
}
export function findDataInProducts({ detail }: findDataInProductsProps) {
	let dataProducts = {
		weldings: 0,
		painting: 0,
		smithy: 0,
		turning_works: 0,
	}

	detail?.products?.forEach(product => {
		dataProducts.weldings += product.welding_allowance
		dataProducts.weldings += product.welding_delivery
		dataProducts.weldings += product.welding_fixings
		dataProducts.weldings += product.welding_install
		dataProducts.weldings += product.welding_painting
		dataProducts.weldings += product.welding_profit
		dataProducts.weldings += product.welding_rolling
		dataProducts.weldings += product.welding_tax
		dataProducts.weldings += product.welding_work
		dataProducts.painting += product.painting_cost
		dataProducts.smithy += product.smithy
		dataProducts.turning_works += product.turning_works
	})

	return dataProducts
}
