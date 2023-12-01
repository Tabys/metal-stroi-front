import axios from 'axios'
import { Order } from '../../../models'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import { FormCheckbox } from '../detailList/formElements/formCheckbox'
import { FormSelect } from '../detailList/formElements/formSelect'
import { Role } from '../../../components/auth/role'

type formOCProps = {
	orderData: Order
	updated: () => void
}

export function FormOrderController({ orderData, updated }: formOCProps) {
	const methods = useForm<Order>()

	const onSubmit: SubmitHandler<Order> = async data => {
		// console.log(data)
		await axios.put<Order>(
			process.env.REACT_APP_BACKEND_API_URL + 'orders/',
			data
		)
		updated()
	}

	return (
		<div className='controllers'>
			<FormProvider {...methods}>
				<form>
					<input
						type='hidden'
						{...methods.register('id')}
						defaultValue={orderData.id}
					/>
					<Form.Group>
						<Form.Label>Доставка:</Form.Label>
						<FormCheckbox
							name='delivery'
							defaultChecked={orderData.delivery}
							onSubmit={methods.handleSubmit(onSubmit)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Наценка на металл:</Form.Label>
						<FormSelect
							name='markup'
							selected={orderData.markup}
							arrOptions={[0, 2, 7, 10]}
							onSubmit={methods.handleSubmit(onSubmit)}
							user_role={Role()}
						/>
					</Form.Group>
				</form>
			</FormProvider>
		</div>
	)
}
