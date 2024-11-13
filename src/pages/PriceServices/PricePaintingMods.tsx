import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { PaintingMods } from '../../models'

type PricesProps = {
	price: PaintingMods
	update: () => void
}

export function PircesPaintingMods({ price, update }: PricesProps) {
	const { register, handleSubmit } = useForm<PaintingMods>()

	const onUpdate: SubmitHandler<PaintingMods> = async data => {
		await axios.put<PaintingMods>(process.env.REACT_APP_BACKEND_API_URL + 'price-services-painting-mods', data)
		update()
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />
			<div className='p-2'>{price.name}</div>
			<div className='p-2'>
				<input type='number' defaultValue={price.cost} {...register('cost', { onBlur: handleSubmit(onUpdate) })} className='form-control' />
			</div>
			<div className='p-2'>{price.type}</div>
		</form>
	)
}
