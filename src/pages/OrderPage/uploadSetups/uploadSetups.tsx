import axios from 'axios'
import React from 'react'
import {useState} from 'react'
import { ErrorMassage } from '../../../components/ErrorMassage'
import { Setup } from '../../../models'


const setupData = new FormData()

interface uploadSetupsProps {
    onCreate: (Setup: Setup) => void
    orderId: string
}

export function UploadSetups({onCreate, orderId}: uploadSetupsProps){
   
    const [valueFiles, setvalueFiles] = useState<File[]>([])
     
    const [error, setError] = useState('')

    // Get value from input file multiple
    const changeHandlerFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files){
            const _files = Array.from(e.target.files)
            setvalueFiles(_files)
        }
        
    }

    const sumbitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')

        setupData.append('order_id', orderId)
        for(let file of valueFiles){
            setupData.append('files', file)
        }
        

        console.log(setupData)

        const response = await axios.post<Setup>('http://localhost:8080/api/upload/', setupData)
        
        
        onCreate(response.data)
    }



    return (
        <form onSubmit={sumbitHandler} encType="multipart/form-data">
            <label htmlFor="title" className="form-label">Файлы</label>
            <input  onChange={changeHandlerFiles} className="form-control" type="file" name="files" id="files" multiple/>
            <button type="submit" className="btn btn-primary container-fluid mt-5">Create</button>
            { error && <ErrorMassage error={error} />}
        </form>
    )
}