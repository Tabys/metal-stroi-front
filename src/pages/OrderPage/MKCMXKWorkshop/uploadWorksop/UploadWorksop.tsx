import { useForm, SubmitHandler } from 'react-hook-form'
import Spinner from 'react-bootstrap/Spinner'
import { useState } from 'react'
import apiClient from '../../../../components/apiClient'
import { UploadWorkshopType } from '../../../../models'

type UploadWorkshopProps = {
	onCreate: () => void
	orderId: number
}

export function UploadWorkshop({ onCreate, orderId }: UploadWorkshopProps) {
	const [load, setLoad] = useState(false)

	const { register, handleSubmit } = useForm<UploadWorkshopType>()

	const onSubmit: SubmitHandler<UploadWorkshopType> = async data => {
		await apiClient.post<UploadWorkshopType>('workshops-data/', data).then(async response => {
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
			<input type='hidden' {...register('order_id')} defaultValue={orderId} />
			<button type='submit' className='fixed' disabled={load === true ? true : false}>
				{load === true ? <Spinner animation='border' /> : <i className='fi fi-sr-add'></i>}
			</button>
		</form>
	)
}
