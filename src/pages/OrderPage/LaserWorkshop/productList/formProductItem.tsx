import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form'
import { Order, PaintingMods, Product, ProductsFull } from '../../../../models'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { DeleteProduct } from './DeleteProduct'
import { CulcPaintingCost } from './CulcPaintingCost'
import { culcCostProduct } from './culcCostProduct'
import Select from 'react-select'
import apiClient from '../../../../components/apiClient'

type FormProductItemProps = {
	orderData: Order
	productItem: Product
	index: number
	editedProducts?: ProductsFull[]
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
				<div className={styles.line + ' ' + styles.big}>
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
				<div className={styles.line + ' ' + styles.details_in_prod + ' ' + styles.big}>
					{productItem.details?.map(detail => {
						return <p key={detail.id}>{detail.name + '(' + detail?.product_detail?.count + 'шт.)'}</p>
					})}
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
					<input
						{...methods.register('sm_works', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.sm_works === null ? 0 : productItem.sm_works}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
					<input
						{...methods.register('mk_works', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.mk_works === null ? 0 : productItem.mk_works}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
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
				<div className={styles.line + ' ' + styles.yellow}>
					<input
						{...methods.register('tfc_works', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.tfc_works === null ? 0 : productItem.tfc_works}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
					<input
						{...methods.register('ac_works', {
							onBlur: methods.handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
						defaultValue={productItem.ac_works === null ? 0 : productItem.ac_works}
						type='number'
						className='form-control'
					/>
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
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
				<div className={styles.line + ' ' + styles.red}>
					<input
						{...methods.register('painting_color', {
							onBlur: methods.handleSubmit(onSubmitColor),
						})}
						defaultValue={productItem.painting_color === '' ? '' : productItem.painting_color}
						type='text'
						className='form-control'
					/>
				</div>
				<div className={styles.line + ' ' + styles.red}>
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

				<div className={styles.line + ' ' + styles.red}>
					<input
						{...methods.register('painting_one_element_price', {
							onBlur: methods.handleSubmit(onSubmitPainting),
							valueAsNumber: true,
						})}
						defaultValue={productItem.painting_one_element_price === null ? 0 : productItem.painting_one_element_price}
						type='number'
						className='form-control'
					/>
				</div>

				<div className={styles.line + ' ' + styles.purple}>
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
		</FormProvider>
	)
}
