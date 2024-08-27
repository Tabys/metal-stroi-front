import axios, { AxiosError } from 'axios'
import {
	Detail,
	Order,
	PriceServiceCategory,
	ExeCustomers,
	PricesServiceItem,
	Setup,
	MetalType,
} from '../../../../../models'
import AuthService from '../../../../../services/auth.service'

type postConditionsProp = {
	order: Order
	detail: Detail
	type: string
}

async function getPrices() {
	try {
		const response = await axios.get<PriceServiceCategory[]>(
			process.env.REACT_APP_BACKEND_API_URL + 'price-services-category'
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

async function getExeCustomers() {
	try {
		const response = await axios.get<ExeCustomers[]>(
			process.env.REACT_APP_BACKEND_API_URL + 'exemptionCustomer'
		)
		return response.data
	} catch (e: unknown) {
		const error = e as AxiosError
		console.log({ error })
	}
}

export async function postConditions({
	order,
	detail,
	type,
}: postConditionsProp) {
	async function getSetup() {
		try {
			const response = await axios.get<Setup>(
				process.env.REACT_APP_BACKEND_API_URL +
					`setup/${detail.setup_id}`
			)
			return response.data
		} catch (e: unknown) {
			const error = e as AxiosError
			console.log({ error })
		}
	}

	const currentUser = AuthService.getCurrentUser()
	const customers = await getExeCustomers()
	const prices = await getPrices()
	const setup = await getSetup()

	let access: boolean = false
	let cuting: PricesServiceItem | undefined = undefined
	let bending: PricesServiceItem | undefined = undefined
	let choping: PricesServiceItem | undefined = undefined

	switch (type) {
		case 'cut':
			const metal_types = await getMetalType()
			const material_name = setup?.material?.split('-')[0]
			const table_name = setup?.table_number

			const material = metal_types?.find(function (materialArray) {
				return materialArray.abbreviation === material_name
			})
			const gas = material?.price_metal_items?.find(function (items) {
				return items.table_name === table_name
			})

			const plasm_cut = prices?.find(function (priceArray) {
				return priceArray.short_title === 'plasm_cut'
			})
			const laser_cut_azote = prices?.find(function (priceArray) {
				return priceArray.short_title === 'laser_azote_cut'
			})
			const laser_cut_oxigen = prices?.find(function (priceArray) {
				return priceArray.short_title === 'laser_oxigen_cut'
			})
			if (detail.cut_type === 'plasma') {
				cuting = plasm_cut?.price_services_items?.find(function (n) {
					return (
						Number(n.metal_thickness_min) <=
							Number(detail.thickness) &&
						Number(n.metal_thickness_max) >=
							Number(detail.thickness)
					)
				})
			} else {
				if (gas?.gas === 'oxygen') {
					cuting = laser_cut_oxigen?.price_services_items?.find(
						function (n) {
							return (
								Number(n.metal_thickness_min) <=
									Number(detail.thickness) &&
								Number(n.metal_thickness_max) >=
									Number(detail.thickness)
							)
						}
					)
					// console.log('OXYGEN')
				} else {
					cuting = laser_cut_azote?.price_services_items?.find(
						function (n) {
							return (
								Number(n.metal_thickness_min) <=
									Number(detail.thickness) &&
								Number(n.metal_thickness_max) >=
									Number(detail.thickness)
							)
						}
					)
					// console.log('AZOTE')
				}
			}

			break
		case 'chop-bend':
			const length = setup?.work_piece?.split(' x ')[0]

			const bend = prices?.find(function (priceArray) {
				return priceArray.short_title === 'bend'
			})
			const chop = prices?.find(function (priceArray) {
				return priceArray.short_title === 'chop'
			})
			bending = bend?.price_services_items?.find(function (n) {
				return (
					Number(n.metal_thickness_min) <= Number(detail.thickness) &&
					Number(n.metal_thickness_max) >= Number(detail.thickness) &&
					Number(n.metal_length_min) <= Number(length) &&
					Number(n.metal_length_max) >= Number(length) &&
					Number(n.quantity_min) <= Number(detail.bends_count) &&
					Number(n.quantity_max) >= Number(detail.bends_count)
				)
			})
			choping = chop?.price_services_items?.find(function (n) {
				return (
					Number(n.metal_thickness_min) <= Number(detail.thickness) &&
					Number(n.metal_thickness_max) >= Number(detail.thickness) &&
					Number(n.quantity_min) <= Number(detail.chop_count) &&
					Number(n.quantity_max) >= Number(detail.chop_count)
				)
			})
			break
	}

	const filteredCustomer = customers?.find(function (customer) {
		return customer.name === order.customer
	})

	if (currentUser?.roles === 'ROLE_USER') {
		if (filteredCustomer !== undefined && filteredCustomer !== null) {
			access = true
		} else {
			access = false
		}
	} else {
		access = true
	}

	return { access, choping, bending, cuting }
}
