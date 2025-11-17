import { SubmitHandler, useForm } from 'react-hook-form'
import apiClient from '../apiClient'
import { useUser } from '../../hooks/currentUser'

type UpdProfitForm = {
	id: number
	profit: number
	user_role: string
}

type UpdProfitProps = {
	profit: number
	tfcId?: number
	update: () => void
	openAlert: (type: string, message?: string) => void
}

export function UpdProfit({ profit, tfcId, update, openAlert }: UpdProfitProps) {
	const { handleSubmit, register } = useForm<UpdProfitForm>()
	const { currentUser } = useUser()

	const onSubmit: SubmitHandler<UpdProfitForm> = async data => {
		await apiClient
			.put<UpdProfitForm>('/tfc-data/update-rate', {
				id: tfcId,
				user_role: currentUser?.roles,
				profit: data.profit,
			})
			.then(result => {
				update()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				className='form-control'
				defaultValue={profit}
				type='number'
				{...register('profit', {
					onBlur: handleSubmit(onSubmit),
					valueAsNumber: true,
				})}
			/>
		</form>
	)
}
