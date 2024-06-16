import { useForm, SubmitHandler } from 'react-hook-form'
import { ClearMetalCostForm } from '../../../models'
import axios from 'axios'
import Tooltip from '../../../components/Tooltip'
import { FaMoneyBill1Wave, FaMoneyBillWave } from 'react-icons/fa6'

type ClearMetalCostProps = {
	details: number[]
	update: () => void
	openAlert: () => void
}

export function ClearMetalCost({
	details,
	openAlert,
	update,
}: ClearMetalCostProps) {
	const { register, handleSubmit } = useForm<ClearMetalCostForm>()

	const onSubmit: SubmitHandler<ClearMetalCostForm> = async data => {
		await axios
			.put<ClearMetalCostForm>(
				process.env.REACT_APP_BACKEND_API_URL + 'detail/all',
				{
					id: details,
					cost: data.cost,
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
			<input {...register('cost')} type='hidden' defaultValue='0' />
			<Tooltip conditions={true} text='Очистить все цены на металл'>
				<button type='submit' className='btn btn-primary'>
					<FaMoneyBillWave />
				</button>
			</Tooltip>
		</form>
	)
}
