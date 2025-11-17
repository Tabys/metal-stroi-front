import { DocTableDetail } from '../../../../../models'

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
		dataProducts.ac_works += Number(product.ac_works)
		dataProducts.sm_works += Number(product.sm_works)
		dataProducts.mk_works += Number(product.mk_works)
		dataProducts.tfc_works += Number(product.tfc_works)
		dataProducts.painting += Number(product.painting_one_element_price)
		dataProducts.smithy += Number(product.smithy)
		dataProducts.turning_works += Number(product.turning_works)
	})

	return dataProducts
}
