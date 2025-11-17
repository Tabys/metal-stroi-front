import { AddProduct, AddProductDetail, Detail, Order } from '../../../../models'
import styles from './style.module.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Form, Spinner } from 'react-bootstrap'
import { DetailList } from './detailList'
import { useEffect, useState } from 'react'
import apiClient from '../../../../components/apiClient'
import { CreateDetailGroupList } from '../detailList/createDetailGroupList'
import { AvailableDetail } from './availableDetail'

type AddProductProps = {
	onCreate: () => void
	onClose: () => void
	order: Order
	openAlert: (type: string, message?: string) => void
}

export function AddProducts({ onCreate, onClose, order, openAlert }: AddProductProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [isAllDetails, setIsAllDetails] = useState(false)

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
	}, [arrProduct, order?.products?.length, setValue, isAllDetails])

	const handleChangeIsAllDetails = () => {
		setIsAllDetails(!isAllDetails)
		setValue('quantity', 1)

		if (!isAllDetails) {
			const details: Detail[] = CreateDetailGroupList({ dataOrder: order })
			setArrProduct(prevArrProduct => ({
				...prevArrProduct,
				quantity: 1,
				details: details
					.map(detail => {
						const count = AvailableDetail(detail)
						return count > 0
							? ({
									id: detail.id,
									name: detail.name,
									count: count,
							  } as unknown as AddProductDetail)
							: null
					})
					.filter((detail): detail is AddProductDetail => detail !== null),
			}))
		} else {
			setArrProduct(prevArrProduct => ({
				...prevArrProduct,
				quantity: 1,
				details: [],
			}))
		}
	}

	const onSubmit: SubmitHandler<AddProduct> = async data => {
		setIsLoading(true)
		arrProduct.name = data.name
		arrProduct.quantity = 1

		await apiClient
			.post<AddProduct>('products/', arrProduct)
			.then(() => {
				onClose()
				onCreate()
				setIsLoading(false)
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
				setIsLoading(false)
			})
	}

	const onSubmitBig: SubmitHandler<AddProduct> = async data => {
		setIsLoading(true)
		arrProduct.name = data.name
		arrProduct.quantity = data.quantity

		await apiClient
			.post<AddProduct>('products/big', arrProduct)
			.then(() => {
				onClose()
				onCreate()
				setIsLoading(false)
			})
			.catch(err => {
				console.log(err.response)
				openAlert('danger', err.response.data.message)
				setIsLoading(false)
			})
	}

	return (
		<form onSubmit={isAllDetails ? handleSubmit(onSubmitBig) : handleSubmit(onSubmit)}>
			<input type='hidden' {...register('order_id')} defaultValue={order.id} />
			<label htmlFor='name' className='form-label'>
				Название изделия
			</label>
			<input
				{...register('name', { required: 'Это поле обязательное' })}
				className={errors.name ? 'form-control is-invalid' : 'form-control'}
				id='name'
				defaultValue=''
			/>
			{errors.name && <Form.Text className='text-danger'>{errors.name.message}</Form.Text>}

			<label htmlFor='name' className='form-label mt-3'>
				Создание изделия из всех деталей
				<div className='d-flex align-items-center gap-2'>
					<label className='d-flex align-items-center gap-2 fw-normal'>
						Добавить
						<input type='checkbox' checked={isAllDetails} onChange={handleChangeIsAllDetails} />
					</label>
					<label className='d-flex align-items-center gap-2 mx-3 fw-normal'>
						Количество
						<div className='w-25'>
							<input
								type='number'
								className='form-control'
								{...register('quantity', { valueAsNumber: true })}
								defaultValue={1}
								disabled={!isAllDetails}
							/>
						</div>
					</label>
				</div>
			</label>

			<div className={styles.details}>
				<DetailList order={order} setArrProduct={setArrProduct} isAllDetails={isAllDetails} />
			</div>

			<button type='submit' className='btn btn-primary container-fluid' disabled={isLoading || arrProduct.details.length === 0}>
				{isLoading ? <Spinner /> : 'Создать'}
			</button>
		</form>
	)
}
