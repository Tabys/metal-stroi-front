import { DocTableDetail, Order, OrderController } from '../../../../models'
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import CreatableSelect from 'react-select/creatable'
import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { CreateDetailGroupList } from '../detailList/createDetailGroupList'
import { PrepArrDetails } from '../documents/components/prepArrDetails/prepArrDetails'
import { CulcTotalData } from '../documents/components/culcTotalData'
import Tooltip from '../../../../components/Tooltip'
import apiClient from '../../../../components/apiClient'

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

	const methods = useForm<OrderController>()

	const onSubmitDelivery: SubmitHandler<OrderController> = async data => {
		if (data.delivery !== 0) {
			const arrDetails = orderData ? CreateDetailGroupList({ dataOrder: orderData }) : undefined
			const details: DocTableDetail[] | undefined = PrepArrDetails({
				arrDetails,
				order: orderData,
				full: true,
			})
			const total = CulcTotalData({ details })
			if (total.weight > 300) {
				data.pallets = Math.ceil(total.weight / 500)
			} else {
				data.pallets = 0
			}
		} else {
			data.pallets = 0
		}

		await apiClient.put<OrderController>('orders/', data)
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

	const onSubmit: SubmitHandler<OrderController> = async data => {
		// console.log(data)
		await apiClient.put<OrderController>('orders/', data)
		updated()
		openAlert()
	}

	// const detailsId: number[] = []
	// orderData?.setups?.forEach(setup => {
	// 	setup?.details?.map(detail => {
	// 		return detailsId?.push(Number(detail.id))
	// 	})
	// })

	return (
		<>
			<div className='controllers'>
				<FormProvider {...methods}>
					<form>
						<input type='hidden' {...methods.register('id')} defaultValue={orderData.id} />
						<input type='hidden' {...methods.register('customer')} defaultValue={orderData.customer} />

						<Form.Group className='group'>
							<Form.Label>
								<Tooltip conditions={true} text='Доставка'>
									<img src='/images/header-table/package-min.png' alt='delivery' />
								</Tooltip>
							</Form.Label>
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
							<Form.Label>
								<Tooltip conditions={true} text='Поддоны'>
									<img src='/images/header-table/free-icon-pallets-7854833-min.png' alt='pallets' />
								</Tooltip>
							</Form.Label>
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
								<Tooltip conditions={true} text='Наценка на металл'>
									<img src='/images/header-table/free-icon-interest-rate-11651084-min.png' alt='markup' />
								</Tooltip>
							</Form.Label>

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
			</div>
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Изменения сохранены
			</Alert>
		</>
	)
}
