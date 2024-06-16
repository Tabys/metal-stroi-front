import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { MetalType, PriceMetalItems } from '../../models'

type PricesProps = {
	price: MetalType
	update: () => void
}

export function PircesItems({ price, update }: PricesProps) {
	const { register, handleSubmit } = useForm<MetalType>()

	const onUpdate: SubmitHandler<MetalType> = async data => {
		// console.log(data)
		await axios.put<MetalType>(
			process.env.REACT_APP_BACKEND_API_URL + 'price-metal-category',
			data
		)
		update()
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />

			<div className='p-2'>{price.abbreviation}</div>
			<div className='p-2'>{price.name}</div>
			<div className='p-2'>
				<input
					type='number'
					defaultValue={price.price}
					{...register('price', { onBlur: handleSubmit(onUpdate) })}
					className='form-control'
				/>
			</div>
		</form>
	)
}
