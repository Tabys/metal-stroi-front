import axios from 'axios'
import { Order } from '../../../models'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import { FormSelect } from '../detailList/formElements/formSelect'
import { Role } from '../../../components/auth/role'
import { ClearMetalCost } from './clearMetalCost'
import { UpdMetalCost } from './updMetalCost'
import { useState } from 'react'
import { Alert } from 'react-bootstrap'

type formOCProps = {
	orderData: Order
	updated: () => void
}

export function FormOrderController({ orderData, updated }: formOCProps) {
	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const methods = useForm<Order>()

	const onSubmit: SubmitHandler<Order> = async data => {
		// console.log(data)
		await axios.put<Order>(
			process.env.REACT_APP_BACKEND_API_URL + 'orders/',
			data
		)
		updated()
		openAlert()
	}
	const detailsId: number[] = []
	orderData?.setups?.map(setup => {
		setup?.details?.map(detail => {
			return detailsId?.push(Number(detail.id))
		})
	})

	return (
		<>
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
							<input
								{...methods.register('delivery', {
									onBlur: methods.handleSubmit(onSubmit),
									valueAsNumber: true,
								})}
								defaultValue={orderData.delivery}
								className='form-control delivery'
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
				<UpdMetalCost
					orderId={orderData.id}
					update={updated}
					openAlert={openAlert}
				/>
				<ClearMetalCost
					details={detailsId}
					update={updated}
					openAlert={openAlert}
				/>
			</div>
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Изменения сохранены
			</Alert>
		</>
	)
}
