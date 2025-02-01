import { SubmitHandler, useForm } from 'react-hook-form'
import { UniversalResetForm } from '../../../../../../models'
import Tooltip from '../../../../../../components/Tooltip'
import { FaXmark } from 'react-icons/fa6'
import apiClient from '../../../../../../components/apiClient'

type UniversalResetProps = {
	orderId: number
	APIObject?: string
	condition: Object
	update: () => void
	openAlert: (type: string, message?: string) => void
}

export function UniversalReset({ orderId, APIObject = 'detail', condition, update, openAlert }: UniversalResetProps) {
	const { handleSubmit } = useForm<UniversalResetForm>()

	const onSubmit: SubmitHandler<UniversalResetForm> = async data => {
		await apiClient
			.put<UniversalResetForm>(`${APIObject}/reset`, {
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
