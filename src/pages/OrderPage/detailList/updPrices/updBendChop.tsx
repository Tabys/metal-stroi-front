import axios, { AxiosError } from 'axios'
import { PriceServiceCategory, Detail, Setup } from '../../../../models'

export async function UpdBandChop(dataDetail: Detail) {
	async function getPrices() {
		try {
			const response = await axios.get<PriceServiceCategory[]>(
				process.env.REACT_APP_BACKEND_API_URL +
					'price-services-category'
			)
			return response.data
		} catch (e: unknown) {
			const error = e as AxiosError
			console.log({ error })
		}
	}

	async function getSetup() {
		try {
			const response = await axios.get<Setup>(
				process.env.REACT_APP_BACKEND_API_URL +
					`setup/${dataDetail.setup_id}`
			)
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
	const THICKNESS = SETUP?.work_piece?.split(' x ')[2]

	// FIND SERVICE TYPE
	const BEND = PRICES?.find(function (priceArray) {
		return priceArray.short_title === 'bend'
	})
	const CHOP = PRICES?.find(function (priceArray) {
		return priceArray.short_title === 'chop'
	})

	const bending = BEND?.price_services_items?.find(function (n) {
		return (
			Number(n.metal_thickness_min) <= Number(THICKNESS) &&
			Number(n.metal_thickness_max) >= Number(THICKNESS)
		)
	})

	const choping = CHOP?.price_services_items?.find(function (n) {
		return (
			Number(n.metal_thickness_min) <= Number(THICKNESS) &&
			Number(n.metal_thickness_max) >= Number(THICKNESS)
		)
	})

	if (
		Number(dataDetail.chop_count) === 0 ||
		dataDetail.chop_count === undefined
	) {
		dataDetail.chop_cost = 0
	} else {
		dataDetail.chop_cost = choping?.cost
	}

	if (
		Number(dataDetail.bends_count) === 0 ||
		dataDetail.bends_count === undefined
	) {
		dataDetail.bend_cost = 0
	} else {
		dataDetail.bend_cost = bending?.cost
	}
	return dataDetail
}
