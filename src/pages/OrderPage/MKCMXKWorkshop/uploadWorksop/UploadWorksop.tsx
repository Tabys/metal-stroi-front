import { useForm, SubmitHandler } from 'react-hook-form'
import Spinner from 'react-bootstrap/Spinner'
import { useState } from 'react'
import apiClient from '../../../../components/apiClient'
import { UploadWorkshopType } from '../../../../models'

type UploadWorkshopProps = {
	onCreate: () => void
	apiUrl: string
	orderId: number
}

export function UploadWorkshop({ onCreate, apiUrl, orderId }: UploadWorkshopProps) {
	const [load, setLoad] = useState(false)

	const { handleSubmit } = useForm<UploadWorkshopType>()

	const onSubmit: SubmitHandler<UploadWorkshopType> = async data => {
		data.order_id = orderId
		await apiClient.post<UploadWorkshopType>(apiUrl, data).then(async response => {
			if (response) {
				await setTimeout(() => {
					setLoad(false)
					onCreate()
				}, 300)
			}
		})
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
			<button type='submit' className='fixed' disabled={load === true ? true : false}>
				{load === true ? <Spinner animation='border' /> : <i className='fi fi-sr-add'></i>}
			</button>
		</form>
	)
}
