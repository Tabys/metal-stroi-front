import { useForm, SubmitHandler } from 'react-hook-form'
import { UpdMetalCostForm } from '../../../models'
import axios from 'axios'
import Tooltip from '../../../components/Tooltip'
import { FaMoneyBill1Wave } from 'react-icons/fa6'

type UpdMetalCostProps = {
	orderId: number
	update: () => void
	openAlert: () => void
}

export function UpdMetalCost({
	orderId,
	openAlert,
	update,
}: UpdMetalCostProps) {
	const { register, handleSubmit } = useForm<UpdMetalCostForm>()

	const onSubmit: SubmitHandler<UpdMetalCostForm> = async data => {
		await axios
			.put<UpdMetalCostForm>(
				process.env.REACT_APP_BACKEND_API_URL + 'detail/all-actual',
				{
					id: orderId,
				}
			)
			.then(result => {
				console.log(result)
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
