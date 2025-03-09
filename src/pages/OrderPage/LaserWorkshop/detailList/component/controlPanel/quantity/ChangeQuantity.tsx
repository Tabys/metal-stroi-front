import { SubmitHandler, useForm } from 'react-hook-form'
import Tooltip from '../../../../../../../components/Tooltip'
import apiClient from '../../../../../../../components/apiClient'

type ChangeQuantityProps = {
	orderId: number
	update: () => void
	openAlert: (type: string, massage?: string) => void
}

type ChangeQuantityForm = {
	order_id: number
	quantity: number
}

export function ChangeQuantity({ orderId, update, openAlert }: ChangeQuantityProps) {
	const { handleSubmit, register } = useForm<ChangeQuantityForm>()

	const onSubmit: SubmitHandler<ChangeQuantityForm> = async data => {
		data.order_id = orderId
		await apiClient
			.put<ChangeQuantityForm>('detail/all-quantity', data)
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
			<Tooltip conditions={true} text='Только детали добавленные вручную'>
				<input
					{...register('quantity', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					className='form-control'
				/>
			</Tooltip>
		</>
	)
}
