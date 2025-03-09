import { useForm, SubmitHandler } from 'react-hook-form'
import { PriceMetalItems } from '../../models'
import apiClient from '../../components/apiClient'

type PricesProps = {
	price: PriceMetalItems
	update: () => void
}

export function PricesItems({ price, update }: PricesProps) {
	const { register, handleSubmit } = useForm<PriceMetalItems>()

	const onUpdate: SubmitHandler<PriceMetalItems> = async data => {
		await apiClient.put<PriceMetalItems>('price-metal-item', data)
		update()
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />
			<div className='p-2'>{price.title}</div>
			<div className='p-2'>{price.table_name}</div>
			<div className='p-2'>
				<input type='number' defaultValue={price.cost} {...register('cost', { onBlur: handleSubmit(onUpdate) })} className='form-control' />
			</div>
		</form>
	)
}
