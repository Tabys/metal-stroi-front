export type Order = {
	id: number
	order_number: number
	implementer?: string
	title?: string
	date_create?: string // date
	delivery: number
	pallets: number
	markup: number
	customer?: string
	production_time?: number
	rolling_outsourcing?: boolean
	vat?: string
	createdAt?: string // date
	updateAt?: string // date
	work_types: number[]
	comment_painting?: string
	comment_workshop?: string
	cost?: number
	division: number
	workshops_data?: WorkshopData
	workshops_products?: WorkshopProduct[]
	tfc_data?: TFCData
	tfc_details?: TFCDetail[]
	details?: Detail[]
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
	azote: boolean
	custom: boolean
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
	polymer_one_element_price: number
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
	custom?: boolean
	l_size?: number
	w_size?: number
	order_id?: number
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
	sm_works: number
	mk_works: number
	tfc_works: number
	ac_works: number
	painting_color: string
	painting_options: JSON[]
	painting_price: number
	painting_base_price: number
	painting_one_element_price: number
	painting_cost: number
	smithy: number
	turning_works: number
	design_department: number

	order_id: number
	details?: Detail[]
	product_detail?: ProductsDetails
}

export type ProductsFull = {
	id: number
	name: string
	quantity: number
	totalPrice: number
	painting_color: string
	value: number
	painting_cost?: number
	weight: number
	detailsWeight: number
	detailsCutCost: number
	detailsChoping: number
	detailsBanding: number
	sm_works: number
	mk_works: number
	tfc_works: number
	ac_works: number
	turning_works: number
	smithy: number
	design_department: number
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
	thickness: number
	material: string
	customers_metal: boolean
	azote: boolean
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
	comment?: string
	customer_metal: boolean
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
	sort?: number
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
	price_services_painting_mods?: PaintingMods[]
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
	polymer_options?: JSON[]
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
	painting_options: JSON[]
	painting_color?: string
	painting_cost?: number
	painting_one_element_price?: number
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
	cost: number
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
	implementer: string
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

	metal_all: number
	cuting_all: number
	bending_all: number
	choping_all: number
	rolling_all: number
	painting_all: number

	prod_painting: number
	prod_turning_works: number
	prod_smithy: number
	prod_sm_works: number
	prod_mk_works: number
	prod_tfc_works: number
	prod_ac_works: number
	prod_design_department: number
	prod_price: number
	prod_quantity: number

	oneKgDelivery: number
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

export type AddSetupsChoping = {
	id: string
	material?: string
	length: number
	width: number
	thickness: number
	thicknessTitle: string
	table_number?: string
	order_index?: number
	order_id?: number
	suffixes?: JSON[]
	detailsNames?: string
	details: AddDetail[]
}

export type AddSetupsBending = {
	id: string
	material?: string
	length: number
	width: number
	thickness: number
	thicknessTitle: string
	table_number?: string
	order_index?: number
	order_id?: number
	suffixes?: JSON[]
	detailsNames?: string
	details: AddDetail[]
}

export type DocTableProductSpec = {
	id: number
	name: string
	quantity: number
	totalPrice: number
	painting_color?: string
	painting_cost?: number
	painting_one_element_price?: number
	weight?: number
	detailsWeight?: number
	detailsCutCost?: number
	detailsChoping?: number
	detailsBanding?: number
	value?: number
	sm_works?: number
	mk_works?: number
	tfc_works?: number
	ac_works?: number
	turning_works?: number
	smithy?: number
	design_department?: number
	metal?: number
}

export type Nomenclature = {
	id: number
	name: string
	weight: number
	price: number
}

export type UpdBX24 = {
	id: number
}

export type ExeCustomers = {
	id: number
	name: string
	min_price_oxigen: number
	min_price_azote: number
}
export type ExeCustomersCreate = {
	name: string
	min_proce: number
}
export type ExeCustomersDel = {
	id: number
}

export type FormatedSetupsData = {
	id: number
	thickness: number
	table_number: string
	metals: string
	customer_metal: boolean
	setups: Setup[] | undefined
}

export type OrderController = {
	id: number
	delivery: number
	pallets: number
	markup: number
	rolling_outsourcing?: boolean
	customer: string
	cut_price?: number
	user_role?: string
}

export type PaintingMods = {
	id: number
	name: string
	cost: number
	type: string
	icon: string
}

export type ChangeCutPriceForm = {
	id: number
	user_role?: string
	cut_price: number
}

export type ChangeCutTypeForm = {
	id: number
	cut_type: string
}

export type UniversalResetForm = {
	id: number
	condition: Object
}

export type Customers = {
	customer: string
}

// Workshops

export type WorkshopData = {
	id?: number
	payment_form: string
	outsourcing: number
	business_trip: number
	delivery: number
	profit: number
	comment: string
	consumables: number
	tariff_welding: number
	tariff_painting: number
	tariff_installation: number
	tariff_secondment: number
	rate?: number
}

export type WorkshopProduct = {
	id: number
	name: string
	quantity: number
	work_time: number
	work_complexity: number
	installation_time: number
	installation_complexity: number
	painting_time: number
	painting_complexity: number
	other_workshops: number
	polymer_color: string
	polymer_options: JSON[]
	polymer_price: number
	workshops_materials: WorkshopMaterialType[]
	workshops_consumables: WorkshopConsumablesType[]
}

export type WorkshopMaterialType = {
	id: number
	name: string
	weight: number
	price: number
	quantity: number
	workshops_product_material: WorkshopProductMaterial
}

export type WorkshopProductMaterial = {
	base_quantity: number
	actual_quantity: number
	price: number
}

export type AddWorkshopMaterialType = {
	workshops_material_id?: number
	workshops_product_id: number
	base_quantity?: number
	actual_quantity?: number
}

export type WorkshopConsumablesType = {
	id: number
	name: string
	price: number
	quantity: number
	workshops_product_id: number
}

export type AddWorkshopConsumablesType = {
	name: string
	workshops_product_id: number
	price: number
	quantity: number
}

export type UploadWorkshopType = {
	order_id: number
}

export type AddWorkshopProductType = {
	order_id: number
	name: string
	quantity: number
}

export type PriceRatesCategory = {
	id: string
	name: string
	price_rates_items: PriceRatesItem[]
}
export type PriceRatesItem = {
	id?: number
	name: string
	value: number
}

export type ChangeSummeryMaterialType = {
	workshops_material_id?: number
	workshops_product_id: number
	order_id?: number
	quantity: number
}

export type RoundingUpMaterialType = {
	order_id?: number
}

export type WorkshopTotalData = {
	work: number
	installation: number
	painting: number
	polymer: number
	tmc: number
	weight: number
	metal: number
	cost: number
}

export type Rates = {
	id: number
	name: string
	bx_id: number
	value: number
}

export type TFCData = {
	id?: number
	parent_id: number
	machine_cost: number
	delivery: number
	payment_form: number
	profit: number
	rate?: number
	comment: number
}

export type TFCDetail = {
	id?: number
	name: string
	quantity: number
	setup_time: number
	tools: number
	other_workshops_works: number
	other: number
	machine_time: number
	locksmiths_works: number
	outsourcing: number
	material: number
	defect_extra: number
	complexity_extra: number
	order_id?: number
}

export type TFCTotal = {
	setup_time: number
	tools: number
	other_workshops_works: number
	other: number
	machine_time: number
	locksmiths_works: number
	outsourcing: number
	material: number
	cost: number
	details_costs: TFCTotalDetailsCosts[]
}

export type TFCTotalDetailsCosts = {
	id: number
	cost: number
}
