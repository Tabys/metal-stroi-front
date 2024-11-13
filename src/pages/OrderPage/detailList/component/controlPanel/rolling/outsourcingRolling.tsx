import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import Tooltip from '../../../../../../components/Tooltip'
import { Order } from '../../../../../../models'

type OutsourcingRollingProps = {
	orderData: Order
	update: () => void
	openAlert: (type: string, message?: string) => void
}
type OutsourcingRollingCostForm = {
	id: number
	rolling_outsourcing: boolean
}

export function OutsourcingRolling({ orderData, update, openAlert }: OutsourcingRollingProps) {
	const { handleSubmit, register } = useForm<OutsourcingRollingCostForm>()

	const onSubmit: SubmitHandler<OutsourcingRollingCostForm> = async data => {
		data.id = orderData.id
		await axios
			.put<OutsourcingRollingCostForm>(process.env.REACT_APP_BACKEND_API_URL + 'orders/', data)
			.then(result => {
				update()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', 'Ошибка')
				console.log(err.response)
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Tooltip conditions={true} text='Вальцовка аутсорс'>
				<input
					{...register('rolling_outsourcing', {
						onChange: handleSubmit(onSubmit),
					})}
					type='checkbox'
					checked={orderData.rolling_outsourcing}
					className='form-check-input'
				/>
			</Tooltip>
		</form>
	)
}
