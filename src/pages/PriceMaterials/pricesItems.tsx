import { useForm, SubmitHandler } from 'react-hook-form'
import { PriceMetalItems, UserData, WorkPiece } from '../../models'
import apiClient from '../../components/apiClient'
import { FaRegTrashCan } from 'react-icons/fa6'

type PricesProps = {
	price: PriceMetalItems
	update: (type: string, message?: string) => void
	refetchPrices: () => void
	currentUser: UserData
	workPieces: WorkPiece[]
	material?: string
}

export function PricesItems({ price, update, refetchPrices, currentUser, workPieces, material }: PricesProps) {
	const { register, handleSubmit } = useForm<PriceMetalItems>()

	const onUpdate: SubmitHandler<PriceMetalItems> = async data => {
		await apiClient.put<PriceMetalItems>('price-metal-item', data)
		update('success', 'Изменения сохранены')
	}

	const onDelete = async (id: number) => {
		await apiClient.delete<PriceMetalItems>(`price-metal-item/${id}`).then(() => {
			update('success', 'Изменения сохранены')
			refetchPrices()
		})
	}

	const workPiece = workPieces.find(
		piece => piece.material === material && Number(piece.thickness_min) <= Number(price.thickness) && Number(piece.thickness_max) >= Number(price.thickness)
	)

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />
			<div className='p-2'>{price.title}</div>
			<div className='p-2'>{price.table_name}</div>
			<div className='p-2'>{workPiece?.work_piece}</div>
			<div className='p-2'>
				<input
					type='number'
					defaultValue={price.cost}
					{...register('cost', { onBlur: handleSubmit(onUpdate) })}
					className='form-control'
					disabled={currentUser?.['roles'] !== 'ROLE_ADMIN' && currentUser?.['roles'] !== 'ROLE_MODERATOR' ? true : false}
				/>
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
