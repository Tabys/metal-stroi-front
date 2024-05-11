import axios from 'axios'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { Order, Product } from '../../../models'
import styles from './styles.module.css'
import { useEffect } from 'react'
import { DeleteProduct } from './DeleteProduct'
import { CulcPaintingCost } from './CulcPaintingCost'

type FormProductItemProps = {
	orderData: Order
	productItem: Product
	index: number
	updProduct: () => void
	delProduct: () => void
	setError: React.Dispatch<React.SetStateAction<undefined>>
}

export function FormProductItem({
	productItem,
	orderData,
	index,
	delProduct,
	updProduct,
	setError,
}: FormProductItemProps) {
	const methods = useForm<Product>()
	console.log(productItem)
	// Change METAL COST input value during change METAL MARKAP
	useEffect(() => {
		methods.reset()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderData])

	const onSubmit: SubmitHandler<Product> = async data => {
		// console.log(data)
		await axios.put<Product>(
			process.env.REACT_APP_BACKEND_API_URL + 'products/',
			data
		)
		await updProduct()
	}

	const onSubmitPainting: SubmitHandler<Product> = async data => {
		await axios.put<Product>(
			process.env.REACT_APP_BACKEND_API_URL + 'products/',
			CulcPaintingCost({ data, productItem })
		)
		await updProduct()
		await methods.setValue(
			'painting_cost',
			Number(data.painting_cost.toFixed(2))
		)
	}

	const onSubmitQuantity: SubmitHandler<Product> = async data => {
		// console.log(data)
		await axios
			.put<Product>(
				process.env.REACT_APP_BACKEND_API_URL + 'products/quantity/',
				data
			)
			.then(async result => {
				await setError(undefined)
				await updProduct()
			})
			.catch(async err => {
				console.log(err.response)
				if ((err.response.status = 400)) {
					await setError(err.response.data)
					await updProduct()
				}
			})
	}

	return (
		<FormProvider {...methods}>
			<form className={styles.row}>
				<input
					{...methods.register('id')}
					type='hidden'
					defaultValue={productItem.id}
				/>
				<input
					{...methods.register('order_id')}
					type='hidden'
					defaultValue={productItem.order_id}
				/>
				<div>{index + 1}</div>
				<div>
					<input
						{...methods.register('name', {
							onBlur: methods.handleSubmit(onSubmit),
						})}
						defaultValue={
							productItem.name === null ? 0 : productItem.name
						}
						type='text'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('quantity', {
							onBlur: methods.handleSubmit(onSubmitQuantity),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.quantity === null
								? 0
								: productItem.quantity
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('welding_work', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.welding_work === null
								? 0
								: productItem.welding_work
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('welding_fixings', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.welding_fixings === null
								? 0
								: productItem.welding_fixings
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('welding_profit', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.welding_profit === null
								? 0
								: productItem.welding_profit
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('welding_tax', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.welding_tax === null
								? 0
								: productItem.welding_tax
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('welding_rolling', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.welding_rolling === null
								? 0
								: productItem.welding_rolling
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('welding_painting', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.welding_painting === null
								? 0
								: productItem.welding_painting
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('welding_delivery', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.welding_delivery === null
								? 0
								: productItem.welding_delivery
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('welding_install', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.welding_install === null
								? 0
								: productItem.welding_install
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('welding_allowance', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.welding_allowance === null
								? 0
								: productItem.welding_allowance
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('painting_color', {
							onBlur: methods.handleSubmit(onSubmit),
						})}
						defaultValue={
							productItem.painting_color === ''
								? '-'
								: productItem.painting_color
						}
						type='text'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('painting_price', {
							onBlur: methods.handleSubmit(onSubmitPainting),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.painting_price === null
								? 0
								: productItem.painting_price
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('painting_cost', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.painting_cost === null
								? 0
								: productItem.painting_cost
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('smithy', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.smithy === null ? 0 : productItem.smithy
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('turning_works', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.turning_works === null
								? 0
								: productItem.turning_works
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<input
						{...methods.register('design_department', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={
							productItem.design_department === null
								? 0
								: productItem.design_department
						}
						type='number'
						className='form-control'
					/>
				</div>
				<div>
					<DeleteProduct
						product={productItem.id}
						update={delProduct}
					/>
				</div>
			</form>
		</FormProvider>
	)
}
