import { SubmitHandler, useForm } from 'react-hook-form'
import apiClient from '../../../../../../../components/apiClient'

type ChgAllPPOneElemPriceProps = {
	orderId: number
	update: () => void
	openAlert: (type: string, message?: string) => void
}

type ChgAllPPOneElemPriceForm = {
	order_id: number
	polymer_one_element_price: number
}

export function ChgAllPPOneElemPrice({ orderId, update, openAlert }: ChgAllPPOneElemPriceProps) {
	const { handleSubmit, register } = useForm<ChgAllPPOneElemPriceForm>()

	const onSubmit: SubmitHandler<ChgAllPPOneElemPriceForm> = async data => {
		data.order_id = orderId
		await apiClient
			.put<ChgAllPPOneElemPriceForm>('detail/set-all-pp-prices', data)
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
		<form>
			<input
				{...register('polymer_one_element_price', {
					onBlur: handleSubmit(onSubmit),
					valueAsNumber: true,
				})}
				className='form-control delivery'
			/>
		</form>
	)
}
