import { SubmitHandler, useForm } from 'react-hook-form'
import apiClient from '../../components/apiClient'
import { PriceRatesItem } from '../../models'

type TariffsAndRatesItemProps = {
	item: PriceRatesItem
	openAlert: (type: string, massage?: string) => void
}

export function TariffsAndRatesItem({ item, openAlert }: TariffsAndRatesItemProps) {
	const { register, handleSubmit } = useForm<PriceRatesItem>()

	const onUpdate: SubmitHandler<PriceRatesItem> = async data => {
		data.id = item.id
		await apiClient
			.put<PriceRatesItem>('price-metal-item', data)
			.then(result => {
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	return (
		<form className='row'>
			<div className='p-2'>{item.name}</div>
			<div className='p-2'>
				<input type='number' defaultValue={item.value} {...register('value', { onBlur: handleSubmit(onUpdate) })} className='form-control' />
			</div>
		</form>
	)
}
