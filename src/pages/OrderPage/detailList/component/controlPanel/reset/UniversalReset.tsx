import { SubmitHandler, useForm } from 'react-hook-form'
import { UniversalResetForm } from '../../../../../../models'
import axios from 'axios'
import Tooltip from '../../../../../../components/Tooltip'
import { FaXmark } from 'react-icons/fa6'

type UniversalResetProps = {
	orderId: number
	condition: Object
	update: () => void
	openAlert: (type: string, message?: string) => void
}

export function UniversalReset({ orderId, condition, update, openAlert }: UniversalResetProps) {
	const { handleSubmit } = useForm<UniversalResetForm>()

	const onSubmit: SubmitHandler<UniversalResetForm> = async data => {
		await axios
			.put<UniversalResetForm>(process.env.REACT_APP_BACKEND_API_URL + 'detail/reset', {
				id: orderId,
				condition: condition,
			})
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
			<Tooltip conditions={true} text='Обнулить значение'>
				<button type='submit' className='btn btn-link'>
					<FaXmark />
				</button>
			</Tooltip>
		</form>
	)
}
