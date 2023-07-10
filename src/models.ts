import { type } from 'os'
import React from 'react'

export interface IOrder {
    id: string
    title?: string
    orderType?: string
    dateCreate?: any
    createdAt?: any
    updateAt?: any
    setups?: Setup[]
}

export type Setup = {
    id: string
    material?: string
    work_piece?: string
    min_work_piece?: string
    program_runs?: string
    table_number?: string
}

export interface Modal {
    show?: boolean
    visible?: boolean
    handleClose?: any
    handleShow?: any
}