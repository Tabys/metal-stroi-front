import axios from 'axios'
import { DocTableDetail, Order } from '../../../models'
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import { FormSelect } from '../detailList/formElements/formSelect'
import CreatableSelect from 'react-select/creatable'
import { UpdMetalCost } from './updMetalCost'
import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { CreateDetailGroupList } from '../detailList/createDetailGroupList'
import { PrepArrDetils } from '../documents/components/prepArrDetails/prepArrDetails'
import { CulcTotalData } from '../documents/components/culcTotalData'

type formOCProps = {
	orderData: Order
	updated: () => void
}

export function FormOrderController({ orderData, updated }: formOCProps) {
	const defaultOptions = [
		{ value: 2, label: '2' },
		{ value: 3, label: '3' },
		{ value: 4, label: '4' },
		{ value: 5, label: '5' },
		{ value: 6, label: '6' },
		{ value: 7, label: '7' },
		{ value: 8, label: '8' },
		{ value: 9, label: '9' },
		{ value: 10, label: '10' },
		{ value: 11, label: '11' },
		{ value: 12, label: '12' },
		{ value: 13, label: '13' },
		{ value: 14, label: '14' },
		{ value: 15, label: '15' },
		{ value: 16, label: '16' },
		{ value: 17, label: '17' },
		{ value: 18, label: '18' },
		{ value: 19, label: '19' },
		{ value: 20, label: '20' },
	]
	const findOption = defaultOptions.find(option => option.value === orderData.markup)
	if (!findOption) {
		defaultOptions.push({ value: orderData.markup, label: String(orderData.markup) })
	}

	const [alertShow, setAlertShow] = useState(false)
	const [options, setOptions] = useState(defaultOptions)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const methods = useForm<Order>()

	const onSubmitDelivery: SubmitHandler<Order> = async data => {
		if (data.delivery !== 0) {
			const arrDetails = orderData ? CreateDetailGroupList(orderData) : undefined
			const details: DocTableDetail[] | undefined = PrepArrDetils({
				arrDetails,
				orders: orderData,
				full: true,
			})
			const total = CulcTotalData({ details })
			data.pallets = Math.ceil(total.weight / 500)
		} else {
			data.pallets = 0
		}

		await axios.put<Order>(process.env.REACT_APP_BACKEND_API_URL + 'orders/', data)
		methods.setValue('pallets', data.pallets)
		updated()
		openAlert()
	}

	const handleCreateOption = (newValue: string, onChange: (value: number | null) => void) => {
		const newOption = { value: Number(newValue), label: newValue }
		setOptions(prevOptions => [...prevOptions, newOption])
		onChange(Number(newValue))
		methods.handleSubmit(onSubmit)()
	}

	const onSubmit: SubmitHandler<Order> = async data => {
		// console.log(data)
		await axios.put<Order>(process.env.REACT_APP_BACKEND_API_URL + 'orders/', data)
		updated()
		openAlert()
	}
	const detailsId: number[] = []
	orderData?.setups?.forEach(setup => {
		setup?.details?.map(detail => {
			return detailsId?.push(Number(detail.id))
		})
	})

	return (
		<>
			<div className='controllers'>
				<FormProvider {...methods}>
					<form>
						<input type='hidden' {...methods.register('id')} defaultValue={orderData.id} />
						<Form.Group className='group'>
							<Form.Label>Доставка:</Form.Label>
							<input
								{...methods.register('delivery', {
									onBlur: methods.handleSubmit(onSubmitDelivery),
									valueAsNumber: true,
								})}
								defaultValue={orderData.delivery}
								className='form-control delivery'
							/>
						</Form.Group>
						<Form.Group className='group'>
							<Form.Label>Поддоны:</Form.Label>
							<input
								{...methods.register('pallets', {
									onBlur: methods.handleSubmit(onSubmit),
									valueAsNumber: true,
								})}
								defaultValue={orderData.pallets}
								className='form-control pallets'
							/>
						</Form.Group>

						<Form.Group className='group'>
							<Form.Label className='text-end'>
								Вальцовка<br></br>аутсорс:
							</Form.Label>
							<input
								{...methods.register('rolling_outsourcing', {
									onChange: methods.handleSubmit(onSubmit),
								})}
								type='checkbox'
								checked={orderData.rolling_outsourcing}
								className='form-check-input'
							/>
						</Form.Group>

						<Form.Group className='group'>
							<Form.Label className='text-end'>
								Наценка на<br></br>металл:
							</Form.Label>
							{/* <FormSelect
								name='markup'
								selected={orderData.markup}
								arrOptions={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
								onSubmit={methods.handleSubmit(onSubmit)}
								// disabled={Role() === 'ROLE_USER' ? true : false}
							/> */}
							<Controller
								control={methods.control}
								name='markup'
								defaultValue={orderData.markup}
								render={({ field: { onChange, value, ref } }) => (
									<CreatableSelect
										className='markup'
										classNamePrefix='pref'
										value={options.filter(c => c.value === value)}
										onCreateOption={newValue => handleCreateOption(newValue, onChange)}
										onChange={val => {
											onChange(val?.value)
											methods.handleSubmit(onSubmit)()
										}}
										options={options}
										formatCreateLabel={value => `Добавить ${value}`}
										placeholder='Нажми'
									/>
								)}
							/>
						</Form.Group>
					</form>
				</FormProvider>
				<UpdMetalCost orderId={orderData.id} update={updated} openAlert={openAlert} />
			</div>
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Изменения сохранены
			</Alert>
		</>
	)
}
