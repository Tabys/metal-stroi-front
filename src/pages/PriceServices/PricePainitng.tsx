import { useForm, SubmitHandler } from 'react-hook-form'
import { PricesServicePainting, UserData } from '../../models'
import apiClient from '../../components/apiClient'

type PricesProps = {
	price: PricesServicePainting
	update: () => void
	currentUser?: UserData
}

export function PircesPainting({ price, update, currentUser }: PricesProps) {
	const { register, handleSubmit } = useForm<PricesServicePainting>()

	const onUpdate: SubmitHandler<PricesServicePainting> = async data => {
		await apiClient.put<PricesServicePainting>('price-services-painting', data)
		update()
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />
			<div className={price.series ? 'p-2' : 'p-2 d-none'}>{price.series}</div>
			<div className={price.cost ? 'p-2' : 'p-2 d-none'}>
				<input
					type='number'
					defaultValue={price.cost}
					{...register('cost', { onBlur: handleSubmit(onUpdate) })}
					className='form-control'
					disabled={currentUser?.roles !== 'ROLE_ADMIN' && currentUser?.roles !== 'ROLE_MODERATOR' ? true : false}
				/>
			</div>
		</form>
	)
}
