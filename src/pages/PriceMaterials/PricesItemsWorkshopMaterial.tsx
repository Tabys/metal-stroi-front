import { useForm, SubmitHandler } from 'react-hook-form'
import { Nomenclature } from '../../models'
import apiClient from '../../components/apiClient'

type PricesProps = {
	nomenclature: Nomenclature
	update: () => void
}

export function PricesItemsWorkshopMaterial({ nomenclature, update }: PricesProps) {
	const { register, handleSubmit } = useForm<Nomenclature>()

	const onUpdate: SubmitHandler<Nomenclature> = async data => {
		await apiClient.put<Nomenclature>('workshops-materials', data)
		update()
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
				/>
			</div>
			<div className='p-2'>
				<input
					type='number'
					defaultValue={nomenclature.price}
					{...register('price', { onBlur: handleSubmit(onUpdate), valueAsNumber: true })}
					className='form-control'
				/>
			</div>
		</form>
	)
}
