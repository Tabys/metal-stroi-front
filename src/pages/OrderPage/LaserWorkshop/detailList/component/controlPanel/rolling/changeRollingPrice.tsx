import { SubmitHandler, useForm } from 'react-hook-form'
import Tooltip from '../../../../../../../components/Tooltip'
import apiClient from '../../../../../../../components/apiClient'

type ChangeRollingPriceProps = {
	orderId: number
	update: () => void
	openAlert: (type: string, massage?: string) => void
}

type ChangeRollingPriceForm = {
	id: number
	rolling_price: number
}

export function ChangeRollingPrice({ orderId, update, openAlert }: ChangeRollingPriceProps) {
	const { handleSubmit, register } = useForm<ChangeRollingPriceForm>()

	const onSubmit: SubmitHandler<ChangeRollingPriceForm> = async data => {
		data.id = orderId
		await apiClient
			.put<ChangeRollingPriceForm>('detail/rolling-prices', data)
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
					{...register('rolling_price', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					className='form-control delivery'
				/>
			</Tooltip>
		</>
	)
}
