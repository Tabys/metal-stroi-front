import axios, { AxiosError } from 'axios'
import { Detail, Order, PriceServiceCategory, ExeCustomers, PricesServiceItem, Setup } from '../../../../../models'
import AuthService from '../../../../../services/auth.service'

type postConditionsProp = {
	order: Order
	detail: Detail
	type: string
}

async function getPrices() {
	try {
		const response = await axios.get<PriceServiceCategory[]>(process.env.REACT_APP_BACKEND_API_URL + 'price-services-category')
		return response.data
	} catch (e: unknown) {
		const error = e as AxiosError
		console.log({ error })
	}
}

async function getExeCustomers() {
	try {
		const response = await axios.get<ExeCustomers[]>(process.env.REACT_APP_BACKEND_API_URL + 'exemptionCustomer')
		return response.data
	} catch (e: unknown) {
		const error = e as AxiosError
		console.log({ error })
	}
}

export async function postConditions({ order, detail, type }: postConditionsProp) {
	async function getSetup() {
		try {
			const response = await axios.get<Setup[]>(process.env.REACT_APP_BACKEND_API_URL + `setup/`, {
				data: {
					order_id: order.id,
				},
			})
			return response.data
		} catch (e: unknown) {
			const error = e as AxiosError
			console.log({ error })
		}
	}

	const currentUser = AuthService.getCurrentUser()
	const customers = await getExeCustomers()
	const prices = await getPrices()
	const setups = await getSetup()
	const setup = setups?.find(setup => Number(setup.id) === Number(detail.setup_id))

	let bend_count = 0
	let chop_count = 0
	setups?.forEach(setup => {
		setup.details?.forEach(item => {
			bend_count += Number(item.bends_count) * Number(item.setup_detail.count)
			chop_count += Number(item.chop_count) * Number(item.setup_detail.count)
		})
	})

	let access: boolean = false
	let min_cuting_price: number | undefined = undefined
	let serviceItem: PricesServiceItem | undefined = undefined
	let cuting: number = 0
	let bending: PricesServiceItem | undefined = undefined
	let choping: PricesServiceItem | undefined = undefined

	const filteredCustomer = customers?.find(function (customer) {
		return customer.name === order.customer
	})

	switch (type) {
		case 'cut':
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
				serviceItem = plasm_cut?.price_services_items?.find(function (n) {
					return Number(n.metal_thickness_min) <= Number(detail.thickness) && Number(n.metal_thickness_max) >= Number(detail.thickness)
				})
				cuting = Number(serviceItem?.cost)
			} else {
				if (setup?.azote === false) {
					serviceItem = laser_cut_oxigen?.price_services_items?.find(function (n) {
						return Number(n.metal_thickness_min) <= Number(detail.thickness) && Number(n.metal_thickness_max) >= Number(detail.thickness)
					})
					if (filteredCustomer?.min_price_oxigen && filteredCustomer?.min_price_oxigen > 0) {
						cuting = filteredCustomer?.min_price_oxigen
					} else {
						cuting = Number(serviceItem?.cost)
					}
					// console.log('OXYGEN')
				} else {
					serviceItem = laser_cut_azote?.price_services_items?.find(function (n) {
						return Number(n.metal_thickness_min) <= Number(detail.thickness) && Number(n.metal_thickness_max) >= Number(detail.thickness)
					})
					if (filteredCustomer?.min_price_azote && filteredCustomer?.min_price_azote > 0) {
						cuting = filteredCustomer?.min_price_azote
					} else {
						cuting = Number(serviceItem?.cost)
					}
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
					Number(n.quantity_min) <= bend_count &&
					Number(n.quantity_max) >= bend_count
				)
			})
			choping = chop?.price_services_items?.find(function (n) {
				return (
					Number(n.metal_thickness_min) <= Number(detail.thickness) &&
					Number(n.metal_thickness_max) >= Number(detail.thickness) &&
					Number(n.quantity_min) <= chop_count &&
					Number(n.quantity_max) >= chop_count
				)
			})
			break
	}

	if (currentUser?.roles === 'ROLE_USER') {
		if (filteredCustomer !== undefined && filteredCustomer !== null && cuting <= Number(detail.cut_cost)) {
			access = true
		} else {
			access = false
		}
	} else {
		access = true
	}
	return { access, choping, bending, cuting }
}
