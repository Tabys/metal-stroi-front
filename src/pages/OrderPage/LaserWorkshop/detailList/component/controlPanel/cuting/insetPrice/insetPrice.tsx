import { SubmitHandler, useForm } from 'react-hook-form'
import apiClient from '../../../../../../../../components/apiClient'

type ChangeInsetPriceProps = {
	orderId: number
	update: () => void
	openAlert: (type: string, massage?: string) => void
}

type ChangeInsetPriceForm = {
	id: number
	inset_cost: number
}

export function ChangeInsetPrice({ orderId, update, openAlert }: ChangeInsetPriceProps) {
	const { handleSubmit, register } = useForm<ChangeInsetPriceForm>()

	const onSubmit: SubmitHandler<ChangeInsetPriceForm> = async data => {
		data.id = orderId
		await apiClient
			.put<ChangeInsetPriceForm>('detail/inset-prices', data)
			.then(result => {
				update()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				if (err.response.status > 200) {
					openAlert('danger', err.response.data.message)
				}
			})
	}

	return (
		<>
			<input
				{...register('inset_cost', {
					onBlur: handleSubmit(onSubmit),
					valueAsNumber: true,
				})}
				className='form-control delivery'
			/>
		</>
	)
}
