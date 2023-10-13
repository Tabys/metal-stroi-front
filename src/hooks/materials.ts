import axios, { AxiosError } from "axios"
import { useEffect, useState } from 'react';
import { Material } from "../models"


export function useMateials() {
    const [materials, setMateials] = useState<Material[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    function updMaterial() {
        fetchMateials()
    }

    async function fetchMateials() {
        try {
            setError('')
            setLoading(true)
            const response = await axios.get<Material[]>('http://localhost:8080/api/materials')
            setMateials(response.data)
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchMateials()
    }, [])

    // SORT
    materials.sort((a, b) => a.id > b.id ? 1 : -1);

    return { materials, error, loading, updMaterial }
}