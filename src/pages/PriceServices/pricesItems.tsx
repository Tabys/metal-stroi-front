import { useForm, SubmitHandler } from 'react-hook-form'
import axios, { AxiosRequestConfig } from 'axios'
import { PricesServiceItem } from '../../models'

type PricesProps = {
	price: PricesServiceItem
	update: () => void
}

export function PircesItems({ price, update }: PricesProps) {
	const { register, handleSubmit } = useForm<PricesServiceItem>()

	const onUpdate: SubmitHandler<PricesServiceItem> = async data => {
		console.log(data)
		await axios.put<PricesServiceItem>(
			process.env.REACT_APP_BACKEND_API_URL + 'price-services-item',
			data
		)
		update()
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />
			<div className={price.metal_thickness_min ? 'p-2' : 'p-2 d-none'}>
				{price.metal_thickness_min}{' '}
				{price.metal_thickness_max
					? '- ' + price.metal_thickness_max
					: ''}
			</div>
			<div className={price.bend_count_min ? 'p-2' : 'p-2 d-none'}>
				{price.bend_count_min} - {price.bend_count_max}
			</div>
			<div className={price.metal_length_max ? 'p-2' : 'p-2 d-none'}>
				{price.metal_length_min} - {price.metal_length_max}
			</div>
			<div className={price.cost ? 'p-2' : 'p-2 d-none'}>
				<input
					type='number'
					defaultValue={price.cost}
					{...register('cost', { onBlur: handleSubmit(onUpdate) })}
					className='form-control'
				/>
			</div>
			<div
				className={
					price.cut_cost === null || price.cut_cost == 0
						? 'p-2 d-none'
						: 'p-2'
				}
			>
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
