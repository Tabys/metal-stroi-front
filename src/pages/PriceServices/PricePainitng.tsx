import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { PricesServicePainting } from '../../models'

type PricesProps = {
	price: PricesServicePainting
	update: () => void
}

export function PircesPainting({ price, update }: PricesProps) {
	const { register, handleSubmit } = useForm<PricesServicePainting>()

	const onUpdate: SubmitHandler<PricesServicePainting> = async data => {
		// console.log(data)
		await axios.put<PricesServicePainting>(
			process.env.REACT_APP_BACKEND_API_URL + 'price-services-painting',
			data
		)
		update()
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />
			<div className={price.series ? 'p-2' : 'p-2 d-none'}>
				{price.series}
			</div>
			<div className={price.cost ? 'p-2' : 'p-2 d-none'}>
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
