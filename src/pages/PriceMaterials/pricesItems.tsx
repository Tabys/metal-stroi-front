import { useForm, SubmitHandler } from 'react-hook-form'
import { PriceMetalItems, UserData } from '../../models'
import apiClient from '../../components/apiClient'
import { FaRegTrashCan } from 'react-icons/fa6'

type PricesProps = {
	price: PriceMetalItems
	update: () => void
	refetchPrices: () => void
	currentUser: UserData
}

export function PricesItems({ price, update, refetchPrices, currentUser }: PricesProps) {
	const { register, handleSubmit } = useForm<PriceMetalItems>()

	const onUpdate: SubmitHandler<PriceMetalItems> = async data => {
		await apiClient.put<PriceMetalItems>('price-metal-item', data)
		update()
	}

	const onDelete = async (id: number) => {
		await apiClient.delete<PriceMetalItems>(`price-metal-item/${id}`).then(() => {
			update()
			refetchPrices()
		})
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />
			<div className='p-2'>{price.title}</div>
			<div className='p-2'>{price.table_name}</div>
			<div className='p-2'>
				<input type='number' defaultValue={price.cost} {...register('cost', { onBlur: handleSubmit(onUpdate) })} className='form-control' />
			</div>
			{currentUser?.['roles'] === 'ROLE_ADMIN' && (
				<div className='p-2'>
					<button type='button' className='btn' onClick={() => onDelete(price.id)}>
						<FaRegTrashCan />
					</button>
				</div>
			)}
		</form>
	)
}
