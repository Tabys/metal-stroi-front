import axios, { AxiosError } from 'axios'
import { Detail, Setup, MetalType } from '../../../../models'

export async function UpdFoodSteel(dataDetail: Detail) {
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

	async function getMetalType() {
		try {
			const response = await axios.get<MetalType[]>(
				process.env.REACT_APP_BACKEND_API_URL + `price-metal-category`
			)
			return response.data
		} catch (e: unknown) {
			const error = e as AxiosError
			console.log({ error })
		}
	}

	// DATA FROM API
	const SETUP = await getSetup()
	const METAL_TYPE = await getMetalType()

	// SETUPS DATA
	const MATERIAL_NAME = SETUP?.material?.split('-')[0]
	const TABLE_NAME = SETUP?.table_number

	// FIND GAS TYPE
	const MATERIAL = METAL_TYPE?.find(function (materialArray) {
		return materialArray.abbreviation === MATERIAL_NAME
	})
	const MATERIAL_ITEM = MATERIAL?.price_metal_items?.find(function (items) {
		return items.table_name === TABLE_NAME
	})

	if (dataDetail.food_steel === true) {
		dataDetail.metal_cost = MATERIAL_ITEM ? MATERIAL_ITEM.add_cost : 0
	} else {
		dataDetail.metal_cost = MATERIAL_ITEM ? MATERIAL_ITEM.cost : 0
	}

	return dataDetail
}
