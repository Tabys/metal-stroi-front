import { type } from 'os'
import React from 'react'

export type Order = {
    id: string
    title?: string
    orderType?: string
    dateCreate?: string // date 
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

export type Upload ={
    files?: File[]
    order_id?: string
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
    hack_count?: number
    bends_count?: number
    polymer: boolean
    rolling: string
    mec_processing?: string
    weld_work?: string
    weld_hardware?: string
    weld_profit?: string
    weld_metal?: string
    weld_other?: string
    weld_painting?: string
    weld_install?: string
    weld_delivery?: string
    turning_works?: string
    forge?: string
    material?: string
    work_piece?: string
    createdAt?: string
    updatedAt?: string
}

export type Modal = {
    show?: boolean
    visible?: boolean
    handleClose?: any
    handleShow?: any
}