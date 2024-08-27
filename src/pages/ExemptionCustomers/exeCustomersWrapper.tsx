import { useExeCustomers } from '../../hooks/exeCustomers'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import { ExeCustomerItems } from './exeCustomersItems'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ExeCustomersCreate } from '../../models'
import axios from 'axios'
import Select from 'react-select'
import { FilteredCustomers } from './filteredCustomers'

export function ExeCustomersWrapper() {
	const { customers, update } = useExeCustomers()
	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		update()
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const options: any[] = FilteredCustomers(customers)
	const { register, handleSubmit, control } = useForm<ExeCustomersCreate>()

	const onSubmit: SubmitHandler<ExeCustomersCreate> = async data => {
		console.log(data)
		await axios.post<ExeCustomersCreate>(
			process.env.REACT_APP_BACKEND_API_URL + 'exemptionCustomer',
			data
		)
		await openAlert()
	}

	// console.log(prices)
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name={'name'}
					render={({ field: { onChange, value, ref } }) => (
						<Select
							options={options}
							value={options.find(c => c.value === value)}
							onChange={val => onChange(val.value)}
						/>
					)}
				/>
				<button
					type='submit'
					className='btn btn-primary container-fluid mt-3 mb-5'
				>
					Добавить
				</button>
			</form>

			<div className='table'>
				<div className='row header'>
					<div className='p-2'>№</div>
					<div className='p-2'>Заказчик</div>
					<div className='p-2'>Удалить</div>
				</div>
				{customers
					? customers?.map((customer, index) => (
							<ExeCustomerItems
								index={index}
								customer={customer}
								key={customer.id}
								update={openAlert}
							/>
					  ))
					: ''}
			</div>

			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Изменения сохранены
			</Alert>
		</>
	)
}
