import { SubmitHandler, useForm } from 'react-hook-form'
import Tooltip from '../../../../../../components/Tooltip'
import apiClient from '../../../../../../components/apiClient'

type ChangeDrowingPriceProps = {
	orderId: number
	update: () => void
	openAlert: (type: string, massage?: string) => void
}

type ChangeDrowingPriceForm = {
	id: number
	drowing_price: number
}

export function ChangeDrowingPrice({ orderId, update, openAlert }: ChangeDrowingPriceProps) {
	const { handleSubmit, register } = useForm<ChangeDrowingPriceForm>()

	const onSubmit: SubmitHandler<ChangeDrowingPriceForm> = async data => {
		data.id = orderId
		await apiClient
			.put<ChangeDrowingPriceForm>('detail/drowing-prices', data)
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
			<Tooltip conditions={true} text='Делится на все позиции деталей поровну'>
				<input
					{...register('drowing_price', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					className='form-control delivery'
				/>
			</Tooltip>
		</>
	)
}
