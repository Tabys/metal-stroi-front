import axios, { AxiosError } from "axios";
import { PriceServiceCategory, Detail, Setup } from "../../../../models";


export async function UpdBandChop(dataDetail: Detail) {

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

    // DATA FROM API
    const SETUP = await getSetup()
    const PRICES = await getPrices()


    // SETUPS DATA
    const LENGTH = SETUP?.work_piece?.split(' x ')[1]
    const THICKNESS = SETUP?.work_piece?.split(' x ')[2]

    // FIND SERVICE TYPE
    const BEND = PRICES?.find(function (priceArray) {
        return priceArray.short_title === 'bend'
    })
    const CHOP = PRICES?.find(function (priceArray) {
        return priceArray.short_title === 'chop'
    })


    const bending = BEND?.price_services_items?.find(function (n) {
        let bend_count = 0
        if (dataDetail.bends_count !== undefined) { bend_count = dataDetail.bends_count }
        return (
            Number(n.metal_length_min) <= Number(LENGTH) &&
            Number(n.metal_length_max) >= Number(LENGTH) &&
            Number(n.metal_thickness_min) <= Number(THICKNESS) &&
            Number(n.metal_thickness_max) >= Number(THICKNESS) &&
            Number(n.bend_count_min) <= bend_count &&
            Number(n.bend_count_max) >= bend_count
        )
    });

    const choping = CHOP?.price_services_items?.find(function (n) {
        let chop_count = 0
        if (dataDetail.chop_count !== undefined) { chop_count = dataDetail.chop_count }
        return (
            Number(n.metal_thickness_min) <= Number(THICKNESS) &&
            Number(n.metal_thickness_max) >= Number(THICKNESS) &&
            Number(n.bend_count_min) <= chop_count &&
            Number(n.bend_count_max) >= chop_count
        )
    });

    dataDetail.chop_cost = choping ? choping.cost : 0
    dataDetail.bend_cost = bending ? bending.cost : 0

    return dataDetail
}