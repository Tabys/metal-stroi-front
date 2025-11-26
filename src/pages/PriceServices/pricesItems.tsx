import { useForm, SubmitHandler } from 'react-hook-form'
import { PricesServiceItem, UserData } from '../../models'
import apiClient from '../../components/apiClient'
import { FaRegTrashCan } from 'react-icons/fa6'

type PricesProps = {
	price: PricesServiceItem
	update: () => void
	currentUser?: UserData
	refetchPrices: () => void
}

export function PircesItems({ price, update, currentUser, refetchPrices }: PricesProps) {
	const { register, handleSubmit } = useForm<PricesServiceItem>()

	const onUpdate: SubmitHandler<PricesServiceItem> = async data => {
		await apiClient.put<PricesServiceItem>('price-services-item', data)
		update()
	}

	const onDelete: SubmitHandler<PricesServiceItem> = async data => {
		await apiClient.delete<PricesServiceItem>('price-services-item', { data: { id: price.id } })
		update()
		refetchPrices()
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />
			<div className={price.metal_thickness_min ? 'p-2' : 'p-2 d-none'}>
				{price.metal_thickness_min} {price.metal_thickness_max ? '- ' + price.metal_thickness_max : ''}
			</div>
			{price.metal_length_min || price.metal_length_max ? (
				<div className={'p-2'}>
					{price.metal_length_min}
					{' - '}
					{price.metal_length_max}
				</div>
			) : (
				''
			)}
			{price.quantity_min || price.quantity_max ? (
				<div className={'p-2'}>
					{price.quantity_min}
					{' - '}
					{price.quantity_max === 1000000 ? '1000+' : price.quantity_max}
				</div>
			) : (
				''
			)}
			<div className={price.cost ? 'p-2' : 'p-2 d-none'}>
				<input
					type='number'
					defaultValue={price.cost}
					{...register('cost', { onBlur: handleSubmit(onUpdate) })}
					className='form-control'
					disabled={currentUser?.roles !== 'ROLE_ADMIN' ? true : false}
				/>
			</div>
			<div className={price.cut_cost === null || Number(price.cut_cost) === 0 ? 'p-2 d-none' : 'p-2'}>
				<input
					type='number'
					defaultValue={price.cut_cost === null ? 0 : price.cut_cost}
					{...register('cut_cost', {
						onBlur: handleSubmit(onUpdate),
					})}
					className='form-control'
					disabled={currentUser?.roles !== 'ROLE_ADMIN' ? true : false}
				/>
			</div>
			{currentUser?.roles === 'ROLE_ADMIN' && (
				<div className='p-2'>
					{price.added ? (
						<button type='button' className='btn' onClick={handleSubmit(onDelete)}>
							<FaRegTrashCan />
						</button>
					) : (
						''
					)}
				</div>
			)}
		</form>
	)
}
