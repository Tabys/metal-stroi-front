import { useForm, SubmitHandler } from 'react-hook-form'
import { PaintingMods, UserData } from '../../models'
import apiClient from '../../components/apiClient'
import { FaRegTrashCan } from 'react-icons/fa6'

type PricesProps = {
	price: PaintingMods
	update: () => void
	currentUser?: UserData
	refetchPrices: () => void
}

export function PircesPaintingMods({ price, update, currentUser, refetchPrices }: PricesProps) {
	const { register, handleSubmit } = useForm<PaintingMods>()

	const onUpdate: SubmitHandler<PaintingMods> = async data => {
		await apiClient.put<PaintingMods>('price-services-painting-mods', data)
		update()
	}

	const onDelete: SubmitHandler<PaintingMods> = async data => {
		await apiClient.delete<PaintingMods>('price-services-painting-mods', { data: { id: price.id } })
		update()
		refetchPrices()
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />
			<div className='p-2'>{price.name}</div>
			<div className='p-2'>
				<i className={'fi ' + price.icon}></i>
			</div>
			<div className='p-2'>
				<input
					type='number'
					defaultValue={price.cost}
					{...register('cost', { onBlur: handleSubmit(onUpdate) })}
					className='form-control'
					disabled={currentUser?.roles !== 'ROLE_ADMIN' && currentUser?.roles !== 'ROLE_MODERATOR' ? true : false}
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
