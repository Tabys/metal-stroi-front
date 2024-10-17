import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { PriceMetalItems } from '../../models'

type PricesProps = {
	price: PriceMetalItems
	update: () => void
}

export function PircesItems({ price, update }: PricesProps) {
	const { register, handleSubmit } = useForm<PriceMetalItems>()

	const onUpdate: SubmitHandler<PriceMetalItems> = async data => {
		await axios.put<PriceMetalItems>(process.env.REACT_APP_BACKEND_API_URL + 'price-metal-item', data)
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
