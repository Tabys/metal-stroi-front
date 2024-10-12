export type Order = {
	id: number
	order_number: number
	implementer?: string
	title?: string
	date_сreate?: string // date
	delivery: number
	pallets: number
	markup: number
	customer?: string
	production_time?: number
	rolling_outsourcing?: boolean
	vat?: string
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
	order_index?: number
	order_id?: number
	suffixes?: JSON[]
	unique: string
	customers_metal: boolean
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
	polymer_base_price: number
	polymer_options: JSON[]
	food_steel: boolean
	rolling: string
	rolling_type?: string
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
	drowing?: number
	additional_setups?: JSON[]
	customers_metal?: boolean
	product_detail?: ProductsDetails
	products?: Product[]
	setups?: Setup[]
	setup_detail: SetupDetail
}
export type SetupDetail = {
	count: number
	detail_id: number
	setup_id: number
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

export type AddSuffix = {
	id: number
	order_id: number
	table_number: string
	material: string
	customers_metal: boolean
	metals: {
		value: string
		label: string
	} | null
	suffixes: JSON[] | undefined
}

export type Metal = {
	id: number
	material: string
	table_number: string
	thickness: number
	metal_sheets: number
	weight_metal: number
	length: number
	width: number
	thickness_title?: string
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
	thickness: number
	table_name: string
	gas: string
	cost: number
	add_cost: number
	title: string
}

export type MetalType = {
	id: number
	name?: string
	abbreviation?: string
	price_metal_items?: PriceMetalItems[]
	density?: number
	price?: number
}

export type PriceMetalItems = {
	id: number
	thickness: string
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
	price_services_rollings?: PricesServiceRolling[]
	price_services_paintings?: PricesServicePainting[]
}

export type PricesServiceItem = {
	id: number
	metal_thickness_min?: number
	metal_thickness_max?: number
	metal_length_min?: number
	metal_length_max?: number
	quantity_min?: number
	quantity_max?: number
	cost?: number
	cut_cost?: number
}

export type PricesServiceRolling = {
	id: number
	type_metal?: string
	metal_thickness?: number
	cost?: number
	min_cost?: number
}
export type PricesServicePainting = {
	id: number
	series: string
	cost: number
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

export type WorkshopMetal = {
	material?: string
	table_number?: string
	thickness: number
	metal_sheets: number
	length: number
	width: number
	suffixes: string
	customers_metal: boolean
	thickness_title?: string
}

export type DocTableDetail = {
	id: string
	thickness?: string
	material?: string
	time: string
	name: string
	cut_cost: number
	cut_type: string
	bend_count?: number
	chop_count?: number
	bend_cost?: number
	chop_cost?: number
	choping: number
	bending: number
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
	suffixes?: string
	polymer?: string
	polymer_price?: number
	surface?: string
	metal_title?: string[]
	customers_metal?: boolean
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
	design_department: number
	weight?: number
	value?: number
}

export type User = {
	first_name: string
	last_name: string
	username: string
	password: string
	role_id: string
}

export type UserData = {
	id: number
	username: string
	email: string
	first_name: string
	last_name: string
	roles: string
	accessToken: string
	refreshToken: string
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

export type CopyOrder = {
	id: number
	copied_order: number
}

export type TotalData = {
	price: number
	quantity: number
	weight: number
	chop: number
	bend: number
	choping: number
	bending: number
	metal: number
	time: number
	length: number
	inset: number
	cuting: number
	cuting_laser: number
	cuting_plasma: number
	painting: number
	rolling: number
	drowing: number
	prod_painting: number
	prod_turning_works: number
	prod_smithy: number
	prod_welding: number
	prod_design_department: number
	prod_price: number
	prod_quantity: number
}

export type MetalChange = {
	id: number
	abbreviation: string
	thickness: number
	order_id: number
}

export type AddDetail = {
	name: string
	thickness?: number
	quantity?: number
	l_size?: number
	w_size?: number
	cut_type?: string
	table_number?: string
	chop_count?: number
	bends_count?: number
	metal_cost?: number
	setup_detail?: {
		count: number | undefined
	}
}

export type AddSetups = {
	id: string
	material?: string
	length: number
	width: number
	min_length: number
	min_width: number
	thickness: number
	thicknessTitle: string
	program_runs?: string
	table_number?: string
	order_index?: number
	order_id?: number
	suffixes?: JSON[]
	details?: AddDetail[]
}

export type DocTableProductSpec = {
	id: number
	name: string
	quantity: number
	totalPrice: number
	painting_color?: string
	painting_cost?: number
	weight?: number
	detailsWeight?: number
	detailsCutCost?: number
	detailsChoping?: number
	detailsBanding?: number
	value?: number
	welding?: number
	turning_works?: number
	smithy?: number
	design_department?: number
}

export type UpdBX24 = {
	id: number
}

export type ExeCustomers = {
	id: number
	name: string
}
export type ExeCustomersCreate = {
	name: string
}
export type ExeCustomersDel = {
	id: number
}

export type FormatedSetupsData = {
	thickness: number
	table_number: string
	metals: string
	setups: Setup[] | undefined
}
