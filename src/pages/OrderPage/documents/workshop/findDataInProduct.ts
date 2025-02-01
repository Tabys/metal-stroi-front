import { DocTableDetail } from '../../../../models'

type findDataInProductsProps = {
	detail: DocTableDetail
}
export function findDataInProducts({ detail }: findDataInProductsProps) {
	let dataProducts = {
		sm_works: 0,
		mk_works: 0,
		tfc_works: 0,
		ac_works: 0,
		painting: 0,
		smithy: 0,
		turning_works: 0,
	}

	detail?.products?.forEach(product => {
		dataProducts.ac_works += product.ac_works
		dataProducts.sm_works += product.sm_works
		dataProducts.mk_works += product.mk_works
		dataProducts.tfc_works += product.tfc_works
		dataProducts.painting += product.painting_cost
		dataProducts.smithy += product.smithy
		dataProducts.turning_works += product.turning_works
	})

	return dataProducts
}
