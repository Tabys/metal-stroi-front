import { useForm, SubmitHandler } from 'react-hook-form'
import { UpdMetalCostForm } from '../../../models'
import Tooltip from '../../../components/Tooltip'
import { FaMoneyBill1Wave } from 'react-icons/fa6'
import apiClient from '../../../components/apiClient'

type UpdMetalCostProps = {
	orderId: number
	update: () => void
	openAlert: () => void
}

export function UpdMetalCost({ orderId, openAlert, update }: UpdMetalCostProps) {
	const { handleSubmit } = useForm<UpdMetalCostForm>()

	const onSubmit: SubmitHandler<UpdMetalCostForm> = async data => {
		await apiClient
			.put<UpdMetalCostForm>('detail/all-actual', {
				id: orderId,
			})
			.then(result => {
				update()
			})
			.catch(err => {
				console.log(err.response)
			})
		await openAlert()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Tooltip conditions={true} text='Актуализировать цены на металл'>
				<button type='submit' className='btn btn-primary'>
					<FaMoneyBill1Wave />
				</button>
			</Tooltip>
		</form>
	)
}
