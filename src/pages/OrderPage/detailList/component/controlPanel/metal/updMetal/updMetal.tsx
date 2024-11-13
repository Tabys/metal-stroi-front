import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdMetalCostForm } from '../../../../../../../models'
import axios from 'axios'
import Tooltip from '../../../../../../../components/Tooltip'
import { FaArrowsRotate } from 'react-icons/fa6'

type UpdMetalProps = {
	orderId: number
	update: () => void
	openAlert: (type: string, message?: string) => void
}

export function UpdMetal({ orderId, update, openAlert }: UpdMetalProps) {
	const { handleSubmit } = useForm<UpdMetalCostForm>()

	const onSubmit: SubmitHandler<UpdMetalCostForm> = async data => {
		await axios
			.put<UpdMetalCostForm>(process.env.REACT_APP_BACKEND_API_URL + 'detail/all-actual', {
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
			<Tooltip conditions={true} text='Актуализировать цены на металл'>
				<button type='submit' className='btn btn-link'>
					<FaArrowsRotate />
				</button>
			</Tooltip>
		</form>
	)
}
