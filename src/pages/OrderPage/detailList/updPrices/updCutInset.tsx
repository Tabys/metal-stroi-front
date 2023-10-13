import axios, { AxiosError } from "axios";
import { PriceServiceCategory, Detail, Setup, MetalType, PricesServiceItem } from "../../../../models";


export async function UpdCutInset(dataDetail: Detail) {

    async function getPrices() {
        try {
            const response = await axios.get<PriceServiceCategory[]>('http://localhost:8080/api/price-services-category')
            return response.data
        } catch (e: unknown) {
            const error = e as AxiosError
            console.log({ error })
        }
    }

    async function getSetup() {
        try {
            const response = await axios.get<Setup>(`http://localhost:8080/api/setup/${dataDetail.setup_id}`)
            return response.data
        } catch (e: unknown) {
            const error = e as AxiosError
            console.log({ error })
        }
    }

    async function getMetalType() {
        try {
            const response = await axios.get<MetalType[]>(`http://localhost:8080/api/price-metal-category`)
            return response.data
        } catch (e: unknown) {
            const error = e as AxiosError
            console.log({ error })
        }
    }

    // DATA FROM API
    const SETUP = await getSetup()
    const PRICES = await getPrices()
    const METAL_TYPE = await getMetalType()

    // SETUPS DATA
    const THICKNESS = SETUP?.work_piece?.split(' x ')[2]
    const MATERIAL_NAME = SETUP?.material?.split('-')[0]
    const TABLE_NAME = SETUP?.table_number

    // FIND GAS TYPE
    const MATERIAL = METAL_TYPE?.find(function (materialArray) {
        return materialArray.abbreviation === MATERIAL_NAME
    })
    const GAS = MATERIAL?.price_metal_items?.find(function (items) {
        return items.table_name === TABLE_NAME
    })

    // FIND SERVICE TYPE
    const PLASM_CUT = PRICES?.find(function (priceArray) {
        return priceArray.short_title === 'plasm_cut'
    })
    const LASER_CUT_AZOTE = PRICES?.find(function (priceArray) {
        return priceArray.short_title === 'laser_azote_cut'
    })
    const LASER_CUT_OXIGEN = PRICES?.find(function (priceArray) {
        return priceArray.short_title === 'laser_oxigen_cut'
    })

    let cuting: PricesServiceItem | undefined = {
        id: 0
    }

    if (dataDetail.cut_type === 'plasma') {
        cuting = PLASM_CUT?.price_services_items?.find(function (n) {
            return Number(n.metal_thickness_min) === Number(THICKNESS)
        });
        console.log('PLASMA')
    } else {
        if (GAS?.gas === 'oxygen') {
            cuting = LASER_CUT_OXIGEN?.price_services_items?.find(function (n) {
                return Number(n.metal_thickness_min) === Number(THICKNESS)
            });
            console.log('OXYGEN')
        } else {
            cuting = LASER_CUT_AZOTE?.price_services_items?.find(function (n) {
                return Number(n.metal_thickness_min) === Number(THICKNESS)
            });
            console.log('AZOTE')
        }
    }

    dataDetail.cut_cost = cuting ? cuting.cost : 0
    dataDetail.inset_cost = cuting?.cut_cost ? cuting?.cut_cost : 0


    return dataDetail
}