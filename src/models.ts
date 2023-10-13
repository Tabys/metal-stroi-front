import { type } from 'os'
import React from 'react'

export type Order = {
    id: number
    title?: string
    date_сreate?: string // date 
    createdAt?: string // date
    updateAt?: string // date
    setups?: Setup[]
}

export type Setup = {
    id: string
    material?: string
    work_piece?: string
    min_work_piece?: string
    program_runs?: string
    table_number?: string
    details?: Detail[]
}

export type Upload = {
    files: File[]
    order_id: number
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
    polymer: boolean
    food_steel: boolean
    rolling: string
    material?: string
    thickness?: string
    real_thickness?: number
    createdAt?: string
    updatedAt?: string
    setup_id?: number
    bend_cost?: number
    chop_cost?: number
    cut_cost?: number
    inset_cost?: number
    metal_cost?: number
    markup: number
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
    table_name?: string
    gas: string
    cost: number
    add_cost: number
    addid?: number
    price_metal_category_id: number
}

export type FormValues = {
    forEach(arg0: (element: any) => void): unknown
    id: number,
    cut_type?: string,
    cut_count?: string,
    bends_count?: string,
    polymer?: boolean,
    rolling?: string,
    mec_processing?: string,
    turning_works?: string,
    forge?: string
}

export type PriceServiceCategory = {
    id: number,
    title: string,
    short_title: string,
    price_services_items?: PricesServiceItem[]
}

export type PricesServiceItem = {
    id: number,
    metal_thickness_min?: number,
    metal_thickness_max?: number,
    metal_length_min?: number,
    metal_length_max?: number,
    bend_count_min?: number,
    bend_count_max?: number,
    cost?: number,
    cut_cost?: number
}