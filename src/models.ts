import React from 'react'

export interface IOrder {
    id?: number
    title: string
    description: string
    published: boolean
    createdAt?: any
    updateAt?: any
}

export interface Modal {
    show?: boolean
    visible?: boolean
    handleClose?: any
    handleShow?: any
}