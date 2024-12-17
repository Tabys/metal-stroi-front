import { SubmitHandler, useForm } from 'react-hook-form'
import apiClient from '../../../../../../../components/apiClient'

type ChangePaintingColorProps = {
	orderId: number
	update: () => void
	openAlert: (type: string, message?: string) => void
}

type ChangePaintingColorForm = {
	id: number
	painting_color: string
}

export function ChangePaintingColor({ orderId, update, openAlert }: ChangePaintingColorProps) {
	const { handleSubmit, register } = useForm<ChangePaintingColorForm>()

	const onSubmit: SubmitHandler<ChangePaintingColorForm> = async data => {
		data.id = orderId
		await apiClient
			.put<ChangePaintingColorForm>('detail/set-all-pp-colors', data)
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
				{...register('painting_color', {
					onBlur: handleSubmit(onSubmit),
					valueAsNumber: true,
				})}
				className='form-control delivery'
			/>
		</>
	)
}