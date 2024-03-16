import axios from 'axios'
import { AddProduct, Order } from '../../../models'
import styles from './style.module.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Form } from 'react-bootstrap'
import { DetailList } from './detailList'
import { useEffect, useState } from 'react'

type AddProductProps = {
	onCreate: () => void
	onClose: () => void
	order: Order
}

export function AddProducts({ onCreate, onClose, order }: AddProductProps) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<AddProduct>()

	const [arrProduct, setArrProduct] = useState<AddProduct>({
		name: '',
		order_id: order.id,
		quantity: 1,
		details: [],
	})

	useEffect(() => {
		if (arrProduct.details.length === 0) {
			setValue('name', '')
		} else {
			if (arrProduct.details.length === 1) {
				setValue('name', '' + arrProduct.details[0].name)
			} else {
				let nameProdCount = Number(order?.products?.length) + 1
				setValue('name', 'Изделие ' + nameProdCount)
			}
		}
	}, [arrProduct])

	const onSubmit: SubmitHandler<AddProduct> = async data => {
		arrProduct.name = data.name

		await axios.post<AddProduct>(
			process.env.REACT_APP_BACKEND_API_URL + 'products/',
			arrProduct
		)
		await onClose()
		await onCreate()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				type='hidden'
				{...register('order_id')}
				defaultValue={order.id}
			/>
			<input type='hidden' {...register('quantity')} defaultValue='1' />
			<label htmlFor='name' className='form-label'>
				Название изделия
			</label>
			<input
				{...register('name', { required: 'Это поле обязательное' })}
				className={
					errors.name ? 'form-control is-invalid' : 'form-control'
				}
				id='name'
				defaultValue=''
			/>
			{errors.name && (
				<Form.Text className='text-danger'>
					{errors.name.message}
				</Form.Text>
			)}

			<div className={styles.details}>
				<DetailList order={order} setArrProduct={setArrProduct} />
			</div>

			<button type='submit' className='btn btn-primary container-fluid'>
				Создать
			</button>
		</form>
	)
}
