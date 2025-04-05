import { SubmitHandler, useForm } from 'react-hook-form'
import Tooltip from '../Tooltip'
import apiClient from '../apiClient'

type UpdProfitForm = {
	id: number
}

type UpdProfitProps = {
	tfcId?: number
	update: () => void
	openAlert: (type: string, message?: string) => void
}

export function UpdProfit({ tfcId, update, openAlert }: UpdProfitProps) {
	const { handleSubmit } = useForm<UpdProfitForm>()

	const onSubmit: SubmitHandler<UpdProfitForm> = async data => {
		await apiClient
			.put<UpdProfitForm>('/tfc-data/update-rate', {
				id: tfcId,
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
			<Tooltip conditions={true} text='Актуализировать ставку прибыли'>
				<button type='submit' className='btn'>
					<i className='fi fi-sr-refresh'></i>
				</button>
			</Tooltip>
		</form>
	)
}
