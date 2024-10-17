import axios, { AxiosError } from 'axios'
import { PriceServiceCategory, Detail, Setup, PricesServiceItem } from '../../../../models'

export async function UpdCutInset(dataDetail: Detail) {
	// console.log(dataDetail)
	async function getPrices() {
		try {
			const response = await axios.get<PriceServiceCategory[]>(process.env.REACT_APP_BACKEND_API_URL + 'price-services-category')
			return response.data
		} catch (e: unknown) {
			const error = e as AxiosError
			console.log({ error })
		}
	}

	async function getSetup() {
		try {
			const response = await axios.get<Setup>(process.env.REACT_APP_BACKEND_API_URL + `setup/${dataDetail.setup_id}`)
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
	const THICKNESS = dataDetail.thickness

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

	if (dataDetail.cut_type === 'plasma') {
		cuting = PLASM_CUT?.price_services_items?.find(function (n) {
			return Number(n.metal_thickness_min) <= Number(THICKNESS) && Number(n.metal_thickness_max) >= Number(THICKNESS)
		})
	} else {
		if (SETUP?.azote === false) {
			cuting = LASER_CUT_OXIGEN?.price_services_items?.find(function (n) {
				return Number(n.metal_thickness_min) <= Number(THICKNESS) && Number(n.metal_thickness_max) >= Number(THICKNESS)
			})
			// console.log('OXYGEN')
		} else {
			cuting = LASER_CUT_AZOTE?.price_services_items?.find(function (n) {
				return Number(n.metal_thickness_min) <= Number(THICKNESS) && Number(n.metal_thickness_max) >= Number(THICKNESS)
			})
			// console.log('AZOTE')
		}
	}

	dataDetail.cut_cost = cuting ? cuting.cost : 0
	dataDetail.inset_cost = cuting?.cut_cost ? cuting?.cut_cost : 0

	return dataDetail
}
