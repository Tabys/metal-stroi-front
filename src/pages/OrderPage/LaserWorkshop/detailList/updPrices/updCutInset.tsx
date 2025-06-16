import { AxiosError } from 'axios'
import { PriceServiceCategory, Detail, Setup, PricesServiceItem, Order } from '../../../../../models'
import apiClient from '../../../../../components/apiClient'

type UpdCutInsetProps = {
	order: Order
	detail: Detail
}

export async function UpdCutInset({ order, detail }: UpdCutInsetProps) {
	// console.log(dataDetail)
	async function getPrices() {
		try {
			const response = await apiClient.get<PriceServiceCategory[]>('price-services-category')
			return response.data
		} catch (e: unknown) {
			const error = e as AxiosError
			console.log({ error })
		}
	}

	async function getSetup() {
		try {
			const response = await apiClient.get<Setup>(`setup/${detail.setup_id}`)
			return response.data
		} catch (e: unknown) {
			const error = e as AxiosError
			console.log({ error })
		}
	}

	// DATA FROM API
	const SETUP = await getSetup()
	const PRICES = await getPrices()

	// SETUPS DATA
	const THICKNESS = detail.thickness

	// FIND SERVICE TYPE
	const PLASM_CUT = PRICES?.find(function (priceArray) {
		return priceArray.short_title === 'plasm_cut'
	})
	const LASER_CUT_AZOTE = PRICES?.find(function (priceArray) {
		return priceArray.short_title === 'laser_azote_cut'
	})
	const LASER_CUT_OXIGEN = PRICES?.find(function (priceArray) {
		return priceArray.short_title === 'laser_oxigen_cut'
	})

	let cuting: PricesServiceItem | undefined = {
		id: 0,
	}

	if (detail.cut_type === 'plasma') {
		cuting = PLASM_CUT?.price_services_items?.find(function (n) {
			return Number(n.metal_thickness_min) <= Number(THICKNESS) && Number(n.metal_thickness_max) >= Number(THICKNESS)
		})
	} else {
		if (SETUP?.azote === false) {
			cuting = LASER_CUT_OXIGEN?.price_service_laser_oxygen_cuts?.find(function (n) {
				return (
					Number(n.metal_thickness_min) <= Number(THICKNESS) &&
					Number(n.metal_thickness_max) >= Number(THICKNESS) &&
					n.payment_form.includes(Number(order?.payment_form)) &&
					n.free_metal === order?.customers_metal
				)
			})
			// console.log('OXYGEN')
		} else {
			cuting = LASER_CUT_AZOTE?.price_services_items?.find(function (n) {
				return Number(n.metal_thickness_min) <= Number(THICKNESS) && Number(n.metal_thickness_max) >= Number(THICKNESS)
			})
			// console.log('AZOTE')
		}
	}

	detail.cut_cost = cuting && !detail.free ? cuting.cost : 0
	detail.inset_cost = cuting?.cut_cost && !detail.free ? cuting?.cut_cost : 0

	return detail
}
