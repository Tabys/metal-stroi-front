import axios, { AxiosError } from 'axios'
import { PriceServiceCategory, Detail } from '../../../../models'

export async function UpdPainting(dataDetail: Detail) {
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

	if (dataDetail.polymer === '') {
		dataDetail.polymer_price = 0
	} else {
		// DATA FROM API
		const ARR_PRICES = await getPrices()
		const PRICE = ARR_PRICES?.find(function (items) {
			return items.id === 8
		})
		const finded_price = PRICE?.price_services_paintings?.find(function (
			items
		) {
			return items.series.split('')[0] === dataDetail.polymer.split('')[0]
		})

		dataDetail.polymer_price = Number(finded_price?.cost)
		dataDetail.polymer_base_price = Number(finded_price?.cost)
	}
	return dataDetail
}
