import { useForm, SubmitHandler } from 'react-hook-form'
import { PricesServiceRolling, UserData } from '../../models'
import apiClient from '../../components/apiClient'

type PricesProps = {
	price: PricesServiceRolling
	update: () => void
	currentUser?: UserData
}

export function PircesRolling({ price, update, currentUser }: PricesProps) {
	const { register, handleSubmit } = useForm<PricesServiceRolling>()

	const onUpdate: SubmitHandler<PricesServiceRolling> = async data => {
		await apiClient.put<PricesServiceRolling>('price-services-rolling', data)
		update()
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />
			<div className={price.type_metal ? 'p-2' : 'p-2 d-none'}>{price.type_metal}</div>
			<div className={price.metal_thickness ? 'p-2' : 'p-2 d-none'}>{price.metal_thickness}</div>
			<div className={price.cost ? 'p-2' : 'p-2 d-none'}>
				<input
					type='number'
					defaultValue={price.cost}
					{...register('cost', { onBlur: handleSubmit(onUpdate) })}
					className='form-control'
					disabled={currentUser?.roles !== 'ROLE_ADMIN' ? true : false}
				/>
			</div>
			<div className={price.min_cost ? 'p-2' : 'p-2 d-none'}>
				<input
					type='number'
					defaultValue={price.min_cost}
					{...register('min_cost', {
						onBlur: handleSubmit(onUpdate),
					})}
					className='form-control'
				/>
			</div>
		</form>
	)
}
