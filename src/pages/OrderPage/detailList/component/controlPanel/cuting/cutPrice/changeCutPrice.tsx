import { SubmitHandler, useForm } from 'react-hook-form'
import { useUser } from '../../../../../../../hooks/curentUser'
import { ChangeCutPriceForm } from '../../../../../../../models'
import Tooltip from '../../../../../../../components/Tooltip'
import apiClient from '../../../../../../../components/apiClient'

type ChangeCutPriceProps = {
	orderId: number
	update: () => void
	openAlert: (type: string, massage?: string) => void
}

export function ChangeCutPrice({ orderId, update, openAlert }: ChangeCutPriceProps) {
	const { handleSubmit, register } = useForm<ChangeCutPriceForm>()
	const { currentUser } = useUser()

	const onSubmit: SubmitHandler<ChangeCutPriceForm> = async data => {
		data.user_role = currentUser?.roles
		data.id = orderId
		await apiClient
			.put<ChangeCutPriceForm>('detail/cut-prices', data)
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
			<Tooltip conditions={true} text='Только лазер(кислород)'>
				<input
					{...register('cut_price', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					className='form-control delivery'
				/>
			</Tooltip>
		</>
	)
}
