import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { MetalType, PriceMetalItems } from '../../models'

type PricesProps = {
	price: PriceMetalItems
	allPrices: MetalType[]
	update: () => void
}

export function PircesItems({ price, allPrices, update }: PricesProps) {
	const currentParent = allPrices.find(function (parent) {
		return parent.id === price.price_metal_category_id
	})
	const currentItem = currentParent?.price_metal_items?.find(function (item) {
		return (
			item.thickness === price.thickness &&
			item.gas === 'azote' &&
			item.table_name !== price.table_name
		)
	})

	const { register, handleSubmit } = useForm<PriceMetalItems>()

	const onUpdate: SubmitHandler<PriceMetalItems> = async data => {
		console.log(data)
		await axios.put<PriceMetalItems>(
			process.env.REACT_APP_BACKEND_API_URL + 'price-metal-item',
			data
		)
		update()
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />
			<input
				type='hidden'
				defaultValue={currentItem?.id ? currentItem.id : 0}
				{...register('addid')}
			/>
			<div className='p-2'>{price.title}</div>
			<div className='p-2'>
				{price.table_name}
				{currentItem?.table_name
					? ' | ' + currentItem.table_name
					: null}
			</div>
			<div className='p-2'>
				<input
					type='number'
					defaultValue={price.cost}
					{...register('cost', { onBlur: handleSubmit(onUpdate) })}
					className='form-control'
				/>
			</div>
		</form>
	)
}
