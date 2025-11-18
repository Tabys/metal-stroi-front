import { useForm, SubmitHandler } from 'react-hook-form'
import { Nomenclature, UserData } from '../../models'
import apiClient from '../../components/apiClient'
import { FaRegTrashCan } from 'react-icons/fa6'

type PricesProps = {
	nomenclature: Nomenclature
	update: () => void
	updateWorkshopMaterial: () => void
	currentUser?: UserData
}

export function PricesItemsWorkshopMaterial({ nomenclature, currentUser, update, updateWorkshopMaterial }: PricesProps) {
	const { register, handleSubmit } = useForm<Nomenclature>()

	const onUpdate: SubmitHandler<Nomenclature> = async data => {
		await apiClient.put<Nomenclature>('workshops-materials', data).then(() => {
			update()
		})
	}

	const onDelete: SubmitHandler<Nomenclature> = async data => {
		await apiClient
			.delete<Nomenclature>('workshops-materials', {
				data: {
					id: data.id,
				},
			})
			.then(() => {
				update()
				updateWorkshopMaterial()
			})
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={nomenclature.id} {...register('id')} />
			<div className='p-2'>{nomenclature.name}</div>
			<div className='p-2'>
				<input
					type='number'
					defaultValue={nomenclature.weight}
					{...register('weight', { onBlur: handleSubmit(onUpdate), valueAsNumber: true })}
					className='form-control'
					disabled={
						currentUser?.roles !== 'ROLE_ADMIN' && currentUser?.roles !== 'ROLE_USER_WORKSHOPS' && currentUser?.roles !== 'ROLE_MODERATOR'
							? true
							: false
					}
				/>
			</div>
			<div className='p-2'>
				<input
					type='number'
					defaultValue={nomenclature.price}
					{...register('price', { onBlur: handleSubmit(onUpdate), valueAsNumber: true })}
					className='form-control'
					disabled={
						currentUser?.roles !== 'ROLE_ADMIN' && currentUser?.roles !== 'ROLE_USER_WORKSHOPS' && currentUser?.roles !== 'ROLE_MODERATOR'
							? true
							: false
					}
				/>
			</div>
			<div className='p-2'>
				<input
					type='number'
					defaultValue={nomenclature.bx_id}
					{...register('bx_id', { onBlur: handleSubmit(onUpdate), valueAsNumber: true })}
					className='form-control'
					disabled={
						currentUser?.roles !== 'ROLE_ADMIN' && currentUser?.roles !== 'ROLE_USER_WORKSHOPS' && currentUser?.roles !== 'ROLE_MODERATOR'
							? true
							: false
					}
				/>
			</div>
			<div className='p-2'>
				<button type='button' onClick={handleSubmit(onDelete)} className='btn btn-link container-fluid'>
					<FaRegTrashCan />
				</button>
			</div>
		</form>
	)
}
