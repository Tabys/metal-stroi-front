import { SubmitHandler, useForm } from 'react-hook-form'
import Tooltip from '../../../../../../components/Tooltip'
import apiClient from '../../../../../../components/apiClient'

type ChangeChopingPriceProps = {
	orderId: number
	update: () => void
	openAlert: (type: string, massage?: string) => void
}

type ChangeChopingPriceForm = {
	id: number
	choping_price: number
}

export function ChangeChopingPrice({ orderId, update, openAlert }: ChangeChopingPriceProps) {
	const { handleSubmit, register } = useForm<ChangeChopingPriceForm>()

	const onSubmit: SubmitHandler<ChangeChopingPriceForm> = async data => {
		data.id = orderId
		await apiClient
			.put<ChangeChopingPriceForm>('detail/choping-prices', data)
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
					{...register('choping_price', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					className='form-control delivery'
				/>
			</Tooltip>
		</>
	)
}
