import { AxiosError } from 'axios'
import { PriceServiceCategory, Detail, Setup, PricesServiceRolling } from '../../../../../models'
import apiClient from '../../../../../components/apiClient'

type UpdRollingsProps = {
	dataDetail: Detail
	free?: boolean
}

export async function UpdRollings({ dataDetail, free }: UpdRollingsProps) {
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
			const response = await apiClient.get<Setup>(`setup/${dataDetail.setup_id}`)
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
		const PRICE = ARR_PRICES?.find(items => {
			return items.short_title === dataDetail.rolling_type
		})
		// SETUPS DATA

		const THICKNESS = dataDetail.thickness
		const MATERIAL_NAME = SETUP?.material

		let SERVICES_COST: PricesServiceRolling[] | undefined = undefined
		let SERVICE_COST: PricesServiceRolling | undefined = undefined

		// DETAIL DATA
		const detail = SETUP?.details?.find(items => {
			return Number(items.id) === Number(dataDetail.id)
		})

		switch (MATERIAL_NAME) {
			case 'St37':
			case 'St37HK':
			case 'St37RIF':
			case 'Hardox':
			case 'Magstrong':
			case '09Г2С':
			case 'ОЦ':
				SERVICES_COST = PRICE?.price_services_rollings?.filter(items => {
					return items.type_metal === 'Черный'
				})
				SERVICE_COST = SERVICES_COST?.find(items => {
					return items.metal_thickness === THICKNESS
				})
				break
			case 'AlMg3':
				SERVICES_COST = PRICE?.price_services_rollings?.filter(items => {
					return items.type_metal === 'Алюм'
				})
				SERVICE_COST = SERVICES_COST?.find(items => {
					return items.metal_thickness === THICKNESS
				})
				break
			case '1.4301':
			case 'aisi304_BA':
			case 'aisi304_4N':
			case 'aisi430_2B':
			case 'aisi430_BA':
			case 'aisi430_4N':
				SERVICES_COST = PRICE?.price_services_rollings?.filter(items => {
					return items.type_metal === 'Нерж'
				})
				SERVICE_COST = SERVICES_COST?.find(items => {
					return items.metal_thickness === THICKNESS
				})
				break
		}

		let rolling_cost = (Number(detail?.serface) / 1000000) * Number(SERVICE_COST?.cost)
		if (rolling_cost < Number(SERVICE_COST?.min_cost)) {
			rolling_cost = Number(SERVICE_COST?.min_cost)
		}

		dataDetail.rolling = free ? '0' : rolling_cost.toFixed(2)
	}
	return dataDetail
}
