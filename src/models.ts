export type Order = {
	id: number
	order_number: number
	implementer?: string
	title?: string
	date_сreate?: string // date
	delivery: boolean
	markup: number
	customer?: string
	production_time?: number
	createdAt?: string // date
	updateAt?: string // date
	metals?: Metal[]
	setups?: Setup[]
	products?: Product[]
}

export type Setup = {
	id: string
	material?: string
	work_piece?: string
	min_work_piece?: string
	program_runs?: string
	table_number?: string
	metal_cost?: number
	details?: Detail[]
}

export type Detail = {
	id: string
	quantity: number
	serface: string
	time: string
	length: string
	weight: string
	cut_count: number
	name: string
	cut_type: string
	chop_count?: number
	bends_count?: number
	polymer: string
	polymer_price: number
	food_steel: boolean
	rolling: string
	material?: string
	thickness?: string
	real_thickness: number
	createdAt?: string
	updatedAt?: string
	setup_id?: number
	bend_cost?: number
	chop_cost?: number
	cut_cost?: number
	inset_cost?: number
	metal_cost?: number
	markup: number
	table_number: string
	add_id?: string[]
	drowing?: number
	metal_title?: string[]
	product_detail?: ProductsDetails
	products?: Product[]
}

export type Product = {
	id: number
	name: string
	quantity: number
	welding_work: number
	welding_fixings: number
	welding_profit: number
	welding_tax: number
	welding_rolling: number
	welding_painting: number
	welding_delivery: number
	welding_install: number
	welding_allowance: number
	painting_color: string
	painting_price: number
	painting_cost: number
	smithy: number
	turning_works: number
	design_department: number

	order_id: number
	details?: Detail[]
	product_detail?: ProductsDetails
}

export type ProductsDetails = {
	detail_id: number
	product_id: number
	count: number
}

export type AddProduct = {
	name: string
	quantity: number
	order_id: number
	details: AddProductDetail[]
}

export type AddProductDetail = {
	id: number
	count: number
	name?: string
}

export type Metal = {
	id: number
	material: string
	table_number: number
	thickness: number
	metal_sheets: number
	weight_metal: number
	length: number
	width: number
}

export type Upload = {
	files: File[]
	order_id: number
}

export type Modal = {
	show?: boolean
	visible?: boolean
	handleClose?: any
	handleShow?: any
}

export type Material = {
	id: number
	name?: string
	abbreviation?: string
}

export type MetalType = {
	id: number
	name?: string
	abbreviation?: string
	price_metal_items?: PriceMetalItems[]
}

export type PriceMetalItems = {
	id: number
	thickness?: string
	title?: string
	table_name?: string
	gas: string
	cost: number
	add_cost: number
	addid?: number
	price_metal_category_id: number
}

export type FormValues = {
	forEach(arg0: (element: any) => void): unknown
	id: number
	cut_type?: string
	cut_count?: number
	bends_count?: number
	polymer?: boolean
	rolling?: string
	mec_processing?: string
	turning_works?: string
	forge?: string
}

export type PriceServiceCategory = {
	id: number
	title: string
	short_title: string
	price_services_items?: PricesServiceItem[]
}

export type PricesServiceItem = {
	id: number
	metal_thickness_min?: number
	metal_thickness_max?: number
	cost?: number
	cut_cost?: number
}

export type NeededMetal = {
	material?: string
	thickness?: string
	metal_sheets: number
	weight_metal: number
	length: number
	width: number
	table_number?: string
}

export type DocTableDetail = {
	id: string
	thickness?: string
	time: string
	name: string
	cut_cost: string
	cut_type: string
	bend_count?: number
	chop_count?: number
	bend_cost?: number
	chop_cost?: number
	choping: string
	bending: string
	metal: string
	quantity: number
	weight?: string
	length?: string
	cut_count?: number
	inset_cost?: number
	cut_price?: number
	table_number?: string
	drowing?: number
	rolling?: number
	painting?: number
	polymer?: string
	polymer_price?: number
	surface?: string
	metal_title?: string[]
	product_detail?: ProductsDetails[]
	products?: Product[]
}

export type DocTableProduct = {
	id: number
	name: string
	quantity: number
	totalPrice: number
	painting_color?: string
	painting_cost?: number
	value?: number
}

export type User = {
	username: string
	password: string
	role_id: string
}

export type Login = {
	username: string
	password: string
	accessToken?: string
}

export type SendPDF = {
	id: number
}

export type ClearMetalCostForm = {
	id: number[]
	cost: number
}

export type UpdMetalCostForm = {
	id: number
}
