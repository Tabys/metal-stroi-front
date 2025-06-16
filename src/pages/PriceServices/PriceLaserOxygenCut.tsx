import { useForm, SubmitHandler } from 'react-hook-form'
import { PricesServiceLaserOxygenCut } from '../../models'
import apiClient from '../../components/apiClient'

type PricesProps = {
	price: PricesServiceLaserOxygenCut
	update: () => void
}

export function PircesLaserOxygenCut({ price, update }: PricesProps) {
	const { register, handleSubmit } = useForm<PricesServiceLaserOxygenCut>()

	const onUpdate: SubmitHandler<PricesServiceLaserOxygenCut> = async data => {
		await apiClient.put<PricesServiceLaserOxygenCut>('price-services-laser-oxygen-cut', data)
		update()
	}

	return (
		<form className='row'>
			<input type='hidden' defaultValue={price.id} {...register('id')} />
			<div className={price.title ? 'p-2' : 'p-2 d-none'}>{price.title}</div>
			<div className={price.cost ? 'p-2' : 'p-2 d-none'}>
				<input type='number' defaultValue={price.cost} {...register('cost', { onBlur: handleSubmit(onUpdate) })} className='form-control' />
			</div>
		</form>
	)
}
