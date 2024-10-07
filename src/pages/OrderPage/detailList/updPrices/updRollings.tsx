import axios, { AxiosError } from 'axios'
import { PriceServiceCategory, Detail, Setup, PricesServiceRolling } from '../../../../models'

export async function UpdRollings(dataDetail: Detail) {
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
	if (dataDetail.rolling_type === '') {
		dataDetail.rolling = '0'
	} else {
		// DATA FROM API
		const SETUP = await getSetup()
		const ARR_PRICES = await getPrices()
		const PRICE = ARR_PRICES?.find(function (items) {
			return items.short_title === dataDetail.rolling_type
		})
		// SETUPS DATA

		const THICKNESS = dataDetail.thickness
		const MATERIAL_NAME = SETUP?.material

		let SERVICES_COST: PricesServiceRolling[] | undefined = undefined
		let SERVICE_COST: PricesServiceRolling | undefined = undefined

		// DETAIL DATA
		const detail = SETUP?.details?.find(function (items) {
			return items.id == dataDetail.id
		})

		switch (MATERIAL_NAME) {
			case 'St37':
			case '09Г2С':
			case 'ОЦ':
				SERVICES_COST = PRICE?.price_services_rollings?.filter(function (items) {
					return items.type_metal === 'Черный'
				})
				SERVICE_COST = SERVICES_COST?.find(function (items) {
					return items.metal_thickness === THICKNESS
				})
				break
			case 'AlMg3':
				SERVICES_COST = PRICE?.price_services_rollings?.filter(function (items) {
					return items.type_metal === 'Алюм'
				})
				SERVICE_COST = SERVICES_COST?.find(function (items) {
					return items.metal_thickness === THICKNESS
				})
				break
			case '1.4301':
			case 'aisi430':
				SERVICES_COST = PRICE?.price_services_rollings?.filter(function (items) {
					return items.type_metal === 'Нерж'
				})
				SERVICE_COST = SERVICES_COST?.find(function (items) {
					return items.metal_thickness === THICKNESS
				})
				break
		}

		let rolling_cost = (Number(detail?.serface) / 1000000) * Number(SERVICE_COST?.cost) * Number(detail?.setup_detail.count)
		if (rolling_cost < Number(SERVICE_COST?.min_cost)) {
			rolling_cost = Number(SERVICE_COST?.min_cost)
		}

		dataDetail.rolling = rolling_cost.toFixed(2)
	}
	return dataDetail
}
