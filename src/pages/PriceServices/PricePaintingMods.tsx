import { useForm, SubmitHandler } from 'react-hook-form'
import { PaintingMods, UserData } from '../../models'
import apiClient from '../../components/apiClient'

type PricesProps = {
	price: PaintingMods
	update: () => void
	currentUser?: UserData
}

export function PircesPaintingMods({ price, update, currentUser }: PricesProps) {
	const { register, handleSubmit } = useForm<PaintingMods>()

	const onUpdate: SubmitHandler<PaintingMods> = async data => {
		await apiClient.put<PaintingMods>('price-services-painting-mods', data)
		update()
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />
			<div className='p-2'>{price.name}</div>
			<div className='p-2'>
				<input
					type='number'
					defaultValue={price.cost}
					{...register('cost', { onBlur: handleSubmit(onUpdate) })}
					className='form-control'
					disabled={currentUser?.roles !== 'ROLE_ADMIN' && currentUser?.roles !== 'ROLE_MODERATOR' ? true : false}
				/>
			</div>
			<div className='p-2'>{price.type}</div>
		</form>
	)
}
