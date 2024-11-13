import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUser } from '../../../../../../../hooks/curentUser'
import { ChangeCutPriceForm } from '../../../../../../../models'
import Tooltip from '../../../../../../../components/Tooltip'

type ChangeCutPriceProps = {
	orderId: number
	update: () => void
	openAlert: (type: string, massage?: string) => void
}

export function ChangeCutPrice({ orderId, update, openAlert }: ChangeCutPriceProps) {
	const {
		handleSubmit,
		setError,
		register,
		formState: { errors },
	} = useForm<ChangeCutPriceForm>()
	const { currentUser } = useUser()

	const onSubmit: SubmitHandler<ChangeCutPriceForm> = async data => {
		data.user_role = currentUser?.roles
		data.id = orderId
		await axios
			.put<ChangeCutPriceForm>(process.env.REACT_APP_BACKEND_API_URL + 'detail/cut-prices', data)
			.then(result => {
				update()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				if (err.response.status > 200) {
					setError('root.serverError', {
						type: err.response.status,
						message: err.response.data.message,
					})
					openAlert('danger', errors?.root?.serverError.message)
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
