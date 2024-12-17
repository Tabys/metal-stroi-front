import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form'
import { Order, PaintingMods, Product, ProductsFull } from '../../../models'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { DeleteProduct } from './DeleteProduct'
import { CulcPaintingCost } from './CulcPaintingCost'
import { culcCostProduct } from './culcCostProduct'
import Select from 'react-select'
import apiClient from '../../../components/apiClient'

type FormProductItemProps = {
	orderData: Order
	productItem: Product
	index: number
	editedProducts: ProductsFull[] | undefined
	delivery: number
	paintingMods: PaintingMods[]
	updData: () => void
	updProduct: () => void
	delProduct: () => void
	setError: React.Dispatch<React.SetStateAction<undefined>>
}

export function FormProductItem({
	productItem,
	editedProducts,
	delivery,
	paintingMods,
	orderData,
	index,
	updData,
	delProduct,
	updProduct,
	setError,
}: FormProductItemProps) {
	const [productCost, setProductCost] = useState(0)
	const [isDisabledPP, setIsDisabledPP] = useState(productItem.painting_price === null || Number(productItem.painting_price) === 0 ? true : false)
	const methods = useForm<Product>()

	const options: any[] = paintingMods.map(paintingMod => {
		return {
			value: paintingMod.id,
			label: <i className={'fi ' + paintingMod.icon}></i>,
		}
	})

	// Change METAL COST input value during change METAL MARKAP
	useEffect(() => {
		methods.reset()
		setProductCost(culcCostProduct({ products: productItem, editProducts: editedProducts, delivery }))
		setIsDisabledPP(Number(productItem.painting_price) !== 0 ? false : true)
		methods.setValue('painting_options', productItem.painting_options)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderData])

	const onSubmit: SubmitHandler<Product> = async data => {
		await apiClient
			.put<Product>('products/', data)
			.then(() => {
				updProduct()
				updData()
			})
			.catch(async err => {
				console.log(err.response)
			})
	}

	const onSubmitColor: SubmitHandler<Product> = async data => {
		await apiClient
			.put<Product>('products/upd-pp-color', data)
			.then(() => {
				updProduct()
				updData()
			})
			.catch(async err => {
				console.log(err.response)
			})
	}

	const onSubmitPainting: SubmitHandler<Product> = async data => {
		data.painting_base_price = data.painting_price
		await apiClient
			.put<Product>('products/', CulcPaintingCost({ data, productItem }))
			.then(async result => {
				updProduct()
				updData()
			})
			.catch(async err => {
				console.log(err.response)
			})
	}

	const onSubmitOptionPainting: SubmitHandler<Product> = async data => {
		await apiClient
			.put<Product>('products/upd-pp-options', data)
			.then(async result => {
				updProduct()
				updData()
			})
			.catch(async err => {
				console.log(err.response)
			})
	}

	const onSubmitQuantity: SubmitHandler<Product> = async data => {
		await apiClient
			.put<Product>('products/quantity/', data)
			.then(async result => {
				setError(undefined)
				await onSubmitColor(data)
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
				<input {...methods.register('id')} type='hidden' defaultValue={productItem.id} />
				<input {...methods.register('order_id')} type='hidden' defaultValue={productItem.order_id} />
				<div className={styles.line}>{index + 1}</div>
				<div className={styles.line}>
					<input
						{...methods.register('name', {
							onBlur: methods.handleSubmit(onSubmit),
						})}
						defaultValue={productItem.name === null ? 0 : productItem.name}
						type='text'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('quantity', {
							onBlur: methods.handleSubmit(onSubmitQuantity),
							valueAsNumber: true,
						})}
						defaultValue={productItem.quantity === null ? 0 : productItem.quantity}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('welding_work', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.welding_work === null ? 0 : productItem.welding_work}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('welding_fixings', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.welding_fixings === null ? 0 : productItem.welding_fixings}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('welding_profit', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.welding_profit === null ? 0 : productItem.welding_profit}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('welding_tax', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.welding_tax === null ? 0 : productItem.welding_tax}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('welding_rolling', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.welding_rolling === null ? 0 : productItem.welding_rolling}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('welding_painting', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.welding_painting === null ? 0 : productItem.welding_painting}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('welding_delivery', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.welding_delivery === null ? 0 : productItem.welding_delivery}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('welding_install', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.welding_install === null ? 0 : productItem.welding_install}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('welding_allowance', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.welding_allowance === null ? 0 : productItem.welding_allowance}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('painting_color', {
							onBlur: methods.handleSubmit(onSubmitColor),
						})}
						defaultValue={productItem.painting_color === '' ? '' : productItem.painting_color}
						type='text'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<Controller
						control={methods.control}
						name={'painting_options'}
						defaultValue={productItem.painting_options}
						render={({ field: { onChange, onBlur, value, ref } }) => (
							<Select
								classNamePrefix='polymer-select'
								closeMenuOnSelect={false}
								isSearchable={false}
								value={options.filter(c => value?.includes(c.value))}
								onChange={val => {
									onChange(val.map(c => c.value))
								}}
								onBlur={methods.handleSubmit(onSubmitOptionPainting)}
								isDisabled={isDisabledPP}
								options={options}
								isMulti
								placeholder='Нажми'
							/>
						)}
					/>
				</div>

				<input
					{...methods.register('painting_base_price')}
					defaultValue={productItem.painting_base_price === null ? 0 : productItem.painting_base_price}
					tabIndex={6}
					type='hidden'
				/>
				<input
					{...methods.register('painting_price', {
						onBlur: methods.handleSubmit(onSubmitPainting),
						valueAsNumber: true,
					})}
					defaultValue={productItem.painting_price === null ? 0 : productItem.painting_price}
					type='hidden'
					className='form-control'
				/>

				<div className={styles.line}>
					<input
						{...methods.register('painting_cost', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.painting_cost === null ? 0 : productItem.painting_cost}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('smithy', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.smithy === null ? 0 : productItem.smithy}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('turning_works', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.turning_works === null ? 0 : productItem.turning_works}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('design_department', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.design_department === null ? 0 : productItem.design_department}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>{productCost}</div>
				<div className={styles.line}>
					<DeleteProduct product={productItem.id} update={delProduct} />
				</div>
			</form>
			<tr className={styles.details_td}>
				<td colSpan={21}>
					{productItem.details?.map(detail => {
						return <p key={detail.id}>{detail.name + '(' + detail?.product_detail?.count + 'шт.)'}</p>
					})}
				</td>
			</tr>
		</FormProvider>
	)
}
