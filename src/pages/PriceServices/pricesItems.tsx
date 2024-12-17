import { useForm, SubmitHandler } from 'react-hook-form'
import { PricesServiceItem } from '../../models'
import apiClient from '../../components/apiClient'

type PricesProps = {
	price: PricesServiceItem
	update: () => void
}

export function PircesItems({ price, update }: PricesProps) {
	const { register, handleSubmit } = useForm<PricesServiceItem>()

	const onUpdate: SubmitHandler<PricesServiceItem> = async data => {
		await apiClient.put<PricesServiceItem>('price-services-item', data)
		update()
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
				<input type='number' defaultValue={price.cost} {...register('cost', { onBlur: handleSubmit(onUpdate) })} className='form-control' />
			</div>
			<div className={price.cut_cost === null || Number(price.cut_cost) === 0 ? 'p-2 d-none' : 'p-2'}>
				<input
					type='number'
					defaultValue={price.cut_cost === null ? 0 : price.cut_cost}
					{...register('cut_cost', {
						onBlur: handleSubmit(onUpdate),
					})}
					className='form-control'
				/>
			</div>
		</form>
	)
}
