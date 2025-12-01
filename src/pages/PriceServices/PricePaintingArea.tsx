import { useForm, SubmitHandler } from 'react-hook-form'
import { PricesServicePaintingArea, UserData } from '../../models'
import apiClient from '../../components/apiClient'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'

type PricesProps = {
	price: PricesServicePaintingArea
	update: () => void
	currentUser?: UserData
	refetchPrices: () => void
}

export function PircesPaintingArea({ price, update, currentUser, refetchPrices }: PricesProps) {
	const [isLoading, setIsLoading] = useState(false)
	const { register, handleSubmit } = useForm<PricesServicePaintingArea>()

	const onUpdate: SubmitHandler<PricesServicePaintingArea> = async data => {
		setIsLoading(true)
		await apiClient
			.put<PricesServicePaintingArea>('price-services-painting-area', data)
			.then(() => {
				setIsLoading(false)
				refetchPrices()
				update()
			})
			.catch(err => {
				setIsLoading(false)
				console.log(err)
			})
	}

	const onDelete: SubmitHandler<PricesServicePaintingArea> = async data => {
		setIsLoading(true)
		await apiClient
			.delete<PricesServicePaintingArea>('price-services-painting-area', { data: { id: price.id } })
			.then(() => {
				setIsLoading(false)
				refetchPrices()
				update()
			})
			.catch(err => {
				setIsLoading(false)
				console.log(err)
			})
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />
			<div className={price.area ? 'p-2' : 'p-2 d-none'}>{price.area}</div>
			<div className={price.cost ? 'p-2' : 'p-2 d-none'}>
				<input
					type='number'
					defaultValue={price.cost}
					{...register('cost', { onBlur: handleSubmit(onUpdate), valueAsNumber: true })}
					className='form-control'
					disabled={currentUser?.roles !== 'ROLE_ADMIN' && currentUser?.roles !== 'ROLE_MODERATOR' ? true : false}
				/>
			</div>
			<div className={'p-2'}>
				<button type='button' className='btn' onClick={handleSubmit(onDelete)} disabled={isLoading}>
					{isLoading ? <Spinner animation='border' size='sm' /> : <FaRegTrashCan />}
				</button>
			</div>
		</form>
	)
}
