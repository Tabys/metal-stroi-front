import { useForm, SubmitHandler } from 'react-hook-form'
import { ExeCustomers } from '../../models'
import { FaRegTrashCan } from 'react-icons/fa6'
import apiClient from '../../components/apiClient'

type ExeCustomerItemsProps = {
	index: number
	customer: ExeCustomers
	update: () => void
}

export function ExeCustomerItems({ index, customer, update }: ExeCustomerItemsProps) {
	const { register, handleSubmit } = useForm<ExeCustomers>()

	const onUpdate: SubmitHandler<ExeCustomers> = async data => {
		const config = {
			data: {
				id: data.id,
			},
		}

		await apiClient.delete<ExeCustomers>('exemptionCustomer', config)
		update()
	}

	const onSubmit: SubmitHandler<ExeCustomers> = async data => {
		await apiClient.put<ExeCustomers>('exemptionCustomer', data)
		update()
	}

	return (
		<form className='row' onSubmit={handleSubmit(onUpdate)}>
			<input type='hidden' defaultValue={customer.id} {...register('id')} />
			<div className={'p-2'}>{index + 1}</div>
			<div className={'p-2'}>{customer.name}</div>
			<div className={'p-2'}>
				<input
					type='number'
					className='form-control'
					defaultValue={customer.min_price_azote}
					{...register('min_price_azote', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
				/>
			</div>
			<div className={'p-2'}>
				<input
					type='number'
					className='form-control'
					defaultValue={customer.min_price_oxigen}
					{...register('min_price_oxigen', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
				/>
			</div>
			<div className={'p-2'}>
				<button type='submit' className='btn p-1'>
					<FaRegTrashCan />
				</button>
			</div>
		</form>
	)
}
