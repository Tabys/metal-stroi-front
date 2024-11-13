import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import Tooltip from '../../../../../../components/Tooltip'
import { FaXmark } from 'react-icons/fa6'

type ResetPolymerOptionsProps = {
	orderId: number
	update: () => void
	openAlert: (type: string, message?: string) => void
}

type ResetPolymerOptionsForm = {
	id: number
}

export function ResetPolymerOptions({ orderId, update, openAlert }: ResetPolymerOptionsProps) {
	const { handleSubmit } = useForm<ResetPolymerOptionsForm>()

	const onSubmit: SubmitHandler<ResetPolymerOptionsForm> = async data => {
		await axios
			.put<ResetPolymerOptionsForm>(process.env.REACT_APP_BACKEND_API_URL + 'detail/reset-pp-options', {
				id: orderId,
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
