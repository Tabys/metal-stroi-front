import { SubmitHandler, useForm } from 'react-hook-form'
import Tooltip from '../../../../../../../components/Tooltip'
import apiClient from '../../../../../../../components/apiClient'

type ChangeBendingPriceProps = {
	orderId: number
	update: () => void
	openAlert: (type: string, massage?: string) => void
}

type ChangeBendingPriceForm = {
	id: number
	bending_price: number
}

export function ChangeBendingPrice({ orderId, update, openAlert }: ChangeBendingPriceProps) {
	const { handleSubmit, register } = useForm<ChangeBendingPriceForm>()

	const onSubmit: SubmitHandler<ChangeBendingPriceForm> = async data => {
		data.id = orderId
		await apiClient
			.put<ChangeBendingPriceForm>('detail/bending-prices', data)
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
			<Tooltip conditions={true} text='Наценка в %'>
				<input
					{...register('bending_price', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					className='form-control delivery'
				/>
			</Tooltip>
		</>
	)
}
