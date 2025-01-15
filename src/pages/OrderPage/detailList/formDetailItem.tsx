import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form'
import { Detail, DocTableDetail, Order, PaintingMods } from '../../../models'
import styles from './style.module.css'
import { UpdCutInset } from './updPrices/updCutInset'
import { FormRadio } from './formElements/formRadio'
import { useEffect, useState } from 'react'
import Tooltip from '../../../components/Tooltip'
import { UpdRollings } from './updPrices/updRollings'
import { FormSelectRoll } from './formElements/formSelectRoll'
import Select from 'react-select'
import { postConditions } from './component/postConditions/postConditions'
import { culcMetalPriceOneDetail } from './component/culcMetalPriceOneDetail/culcMetalPriceOneDetail'
import { culcCostDetail } from './component/culcCostDetails/culcCostDetails'
import apiClient from '../../../components/apiClient'

type FormDetailItemProps = {
	orderData: Order
	DetailItem: Detail
	editedDetails: DocTableDetail[] | undefined
	index: number
	delivery: number
	paintingMods: PaintingMods[]
	updDetail: () => void
	updData: () => void
	rollAlert: () => void
	serviseAlert: (min_price: number | undefined) => void
}

export function FormDetailItem({
	DetailItem,
	delivery,
	editedDetails,
	orderData,
	index,
	paintingMods,
	rollAlert,
	serviseAlert,
	updDetail,
	updData,
}: FormDetailItemProps) {
	const methods = useForm<Detail>()

	const [isDisabledPP, setIsDisabledPP] = useState(DetailItem.polymer_price === null || Number(DetailItem.polymer_price) === 0 ? true : false)
	const [isDisabledChop, setIsDisabledChop] = useState(DetailItem.chop_count === null || Number(DetailItem.chop_count) === 0 ? true : false)
	const [isDisabledBend, setIsDisabledBend] = useState(DetailItem.bends_count === null || Number(DetailItem.bends_count) === 0 ? true : false)
	const [metalPriceOneDetail, setMetalPriceOneDetail] = useState('')
	const [detailCost, setDetailCost] = useState(0)

	const options: any[] = paintingMods.map(paintingMod => {
		return {
			value: paintingMod.id,
			label: <i className={'fi ' + paintingMod.icon}></i>,
		}
	})

	useEffect(() => {
		methods.reset()
		setMetalPriceOneDetail(culcMetalPriceOneDetail({ order: orderData, detail: DetailItem }))
		setDetailCost(culcCostDetail({ detailsInProduct: editedDetails, detailOutProduct: DetailItem, delivery }))
		methods.setValue('polymer_options', DetailItem.polymer_options)
		setIsDisabledPP(DetailItem.polymer_price !== 0 ? false : true)
		methods.setValue('rolling_type', DetailItem.rolling_type)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderData])

	const onSubmitChop: SubmitHandler<Detail> = async data => {
		data.quantity = DetailItem.quantity
		data.order_id = orderData.id
		delete data.metal_cost
		await apiClient
			.put<Detail>('detail/updChop', data)
			.then(response => {
				updDetail()
				updData()
			})
			.catch(err => {
				console.log(err)
			})
		setIsDisabledChop(data.chop_count !== 0 ? false : true)
	}

	const onSubmitBend: SubmitHandler<Detail> = async data => {
		data.quantity = DetailItem.quantity
		data.order_id = orderData.id
		delete data.metal_cost
		await apiClient
			.put<Detail>('detail/updBend', data)
			.then(number => {
				updDetail()
				updData()
			})
			.catch(err => {
				console.log(err)
			})
		setIsDisabledBend(data.bends_count !== 0 ? false : true)
	}

	const onSubmitCutInset: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await apiClient
			.put<Detail>('detail/', await UpdCutInset(data))
			.then(() => {
				methods.setValue('cut_cost', data.cut_cost)
				methods.setValue('inset_cost', data.inset_cost)
				updDetail()
			})
			.catch(err => {
				console.log(err)
			})
	}

	const onSubmitRolling: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await apiClient
			.put<Detail>('detail/', await UpdRollings(data))
			.then(() => {
				if (data.rolling_type === 'rolling_cone' && Number(DetailItem.thickness) === 2) {
					rollAlert()
				}
				updDetail()
				updData()
			})
			.catch(err => {
				console.log(err)
			})
	}

	const onSubmitPainting: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await apiClient
			.put<Detail>('detail/set-pp-color', data)
			.then(() => {
				updDetail()
				updData()
			})
			.catch(err => {
				console.log(err)
			})
	}

	const onSubmitOptionPainting: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await apiClient
			.put<Detail>('detail/set-pp-options', data)
			.then(() => {
				updDetail()
				updData()
				setIsDisabledPP(data.polymer_price !== 0 ? false : true)
			})
			.catch(err => {
				console.log(err)
			})
	}

	const onSubmitPolymerPrice: SubmitHandler<Detail> = async data => {
		data.polymer_base_price = data.polymer_price
		data.polymer_options = []
		data.polymer_one_element_price = Number(data.polymer_price) * (Number(DetailItem.serface) / 1000000) * 2
		delete data.metal_cost
		await apiClient
			.put<Detail>('detail/', data)
			.then(() => {
				setIsDisabledPP(data.polymer_price !== 0 ? false : true)
				updDetail()
				updData()
			})
			.catch(err => {
				console.log(err)
			})
	}

	const onSubmitPrice: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await apiClient
			.put<Detail>('detail/', data)
			.then(number => {
				updDetail()
				updData()
			})
			.catch(err => {
				console.log(err)
			})
	}

	const onSubmitPriceChop: SubmitHandler<Detail> = async data => {
		const { access, choping } = await postConditions({
			order: orderData,
			detail: data,
			type: 'chop-bend',
		})

		if (Number(data.chop_cost) >= Number(choping?.cost)) {
			await apiClient
				.put<Detail>('detail/', {
					id: data.id,
					chop_cost: data.chop_cost,
				})
				.then(() => {
					DetailItem.chop_cost = data.chop_cost
					updDetail()
				})
		} else {
			if (access === true) {
				await apiClient
					.put<Detail>('detail/', {
						id: data.id,
						chop_cost: data.chop_cost,
					})
					.then(() => {
						DetailItem.chop_cost = data.chop_cost
						updDetail()
					})
			} else {
				methods.setValue('chop_cost', DetailItem.chop_cost)
				serviseAlert(choping?.cost)
			}
		}
	}

	const onSubmitPriceBend: SubmitHandler<Detail> = async data => {
		const { access, bending } = await postConditions({
			order: orderData,
			detail: data,
			type: 'chop-bend',
		})
		if (Number(data.bend_cost) >= Number(bending?.cost)) {
			await apiClient
				.put<Detail>('detail/', {
					id: data.id,
					bend_cost: data.bend_cost,
				})
				.then(() => {
					DetailItem.bend_cost = data.bend_cost
					updDetail()
				})
		} else {
			if (access === true) {
				await apiClient
					.put<Detail>('detail/', {
						id: data.id,
						bend_cost: data.bend_cost,
					})
					.then(() => {
						DetailItem.bend_cost = data.bend_cost
						updDetail()
					})
			} else {
				methods.setValue('bend_cost', DetailItem.bend_cost)
				serviseAlert(bending?.cost)
			}
		}
	}

	const onSubmitPriceCuting: SubmitHandler<Detail> = async data => {
		const { access, cuting } = await postConditions({
			order: orderData,
			detail: data,
			type: 'cut',
		})
		if (Number(data.cut_cost) >= Number(cuting)) {
			await apiClient
				.put<Detail>('detail/', {
					id: data.id,
					cut_cost: data.cut_cost,
				})
				.then(() => {
					DetailItem.cut_cost = data.cut_cost
					updDetail()
				})
		} else {
			if (access === true) {
				await apiClient
					.put<Detail>('detail/', {
						id: data.id,
						cut_cost: data.cut_cost,
					})
					.then(() => {
						DetailItem.cut_cost = data.cut_cost
						updDetail()
					})
			} else {
				methods.setValue('cut_cost', DetailItem.cut_cost)
				serviseAlert(cuting)
			}
		}
	}

	const onSubmitQuantity: SubmitHandler<Detail> = async data => {
		await apiClient
			.put<Detail>('detail/quantity', {
				id: data.id,
				quantity: data.quantity,
			})
			.then(async number => {
				await methods.handleSubmit(onSubmitBend)()
				await methods.handleSubmit(onSubmitChop)()
				updDetail()
			})
			.catch(err => {
				console.log(err)
			})
	}

	// const onSubmitPriceMetal: SubmitHandler<Detail> = async data => {
	// 	await apiClient.put<Detail>(
	// 		'detail/',
	// 		{
	// 			id: data.id,
	// 			metal_cost: data.metal_cost,
	// 		}
	// 	)
	// }

	return (
		<FormProvider {...methods}>
			<form className={styles.row}>
				<input {...methods.register('id')} type='hidden' defaultValue={DetailItem.id} />
				<input {...methods.register('setup_id')} type='hidden' defaultValue={DetailItem.setup_detail.setup_id} />
				<input {...methods.register('thickness')} type='hidden' defaultValue={DetailItem.thickness} />
				<div className={styles.line}>{index + 1} </div>
				<div className={styles.line + ' ' + styles.name}>
					{DetailItem.name} {DetailItem.custom ? '(' + DetailItem.l_size + 'x' + DetailItem.w_size + ')' : ''}
				</div>
				<div className={styles.line}>
					{DetailItem.custom ? (
						<input
							{...methods.register('quantity', {
								onBlur: methods.handleSubmit(onSubmitQuantity),
								valueAsNumber: true,
							})}
							defaultValue={DetailItem.quantity}
							type='number'
							onFocus={e =>
								e.target.addEventListener(
									'wheel',
									function (e) {
										e.preventDefault()
									},
									{ passive: false }
								)
							}
							min='0'
							className='form-control'
						/>
					) : (
						DetailItem.quantity
					)}
				</div>

				<div className={styles.line + ' ' + styles.brown}>{DetailItem.thickness}</div>
				<div className={styles.line + ' ' + styles.brown}>{DetailItem.material}</div>
				<div className={styles.line + ' ' + styles.brown}>{metalPriceOneDetail}</div>

				<FormRadio name='cut_type' defaultValue={DetailItem.cut_type} data={DetailItem} onSubmit={methods.handleSubmit(onSubmitCutInset)} />
				<div className={styles.line + ' ' + styles.green}>
					<input
						{...methods.register('inset_cost', {
							onBlur: methods.handleSubmit(onSubmitPrice),
							valueAsNumber: true,
						})}
						defaultValue={DetailItem.inset_cost === null ? 0 : DetailItem.inset_cost}
						type='number'
						onFocus={e =>
							e.target.addEventListener(
								'wheel',
								function (e) {
									e.preventDefault()
								},
								{ passive: false }
							)
						}
						step='0.1'
						min='0'
						disabled={DetailItem.cut_type === 'laser' ? true : false}
						className='form-control'
					/>
				</div>
				<div className={styles.line + ' ' + styles.green}>
					<input
						{...methods.register('cut_cost', {
							onBlur: methods.handleSubmit(onSubmitPriceCuting),
							valueAsNumber: true,
						})}
						defaultValue={DetailItem.cut_cost === null ? 0 : DetailItem.cut_cost}
						tabIndex={9}
						type='number'
						onFocus={e =>
							e.target.addEventListener(
								'wheel',
								function (e) {
									e.preventDefault()
								},
								{ passive: false }
							)
						}
						step='0.1'
						min='0'
						className='form-control'
					/>
				</div>

				<div className={styles.line + ' ' + styles.yellow}>
					<input
						{...methods.register('bends_count', {
							onBlur: methods.handleSubmit(onSubmitBend),
							valueAsNumber: true,
						})}
						defaultValue={DetailItem.bends_count === null ? 0 : DetailItem.bends_count}
						tabIndex={3}
						type='number'
						onFocus={e =>
							e.target.addEventListener(
								'wheel',
								function (e) {
									e.preventDefault()
								},
								{ passive: false }
							)
						}
						className='form-control'
						min='0'
						required
					/>
				</div>
				<div className={styles.line + ' ' + styles.yellow}>
					<input
						{...methods.register('bend_cost', {
							onBlur: methods.handleSubmit(onSubmitPriceBend),
							valueAsNumber: true,
						})}
						defaultValue={DetailItem.bend_cost === null ? 0 : DetailItem.bend_cost}
						tabIndex={4}
						type='number'
						onFocus={e =>
							e.target.addEventListener(
								'wheel',
								function (e) {
									e.preventDefault()
								},
								{ passive: false }
							)
						}
						step='0.1'
						min='0'
						disabled={isDisabledBend}
						className='form-control'
					/>
				</div>

				<div className={styles.line + ' ' + styles.orange}>
					<Tooltip conditions={Number(DetailItem.thickness) > 5 ? true : false} text='Толщина металла должна быть < 5'>
						<input
							{...methods.register('chop_count', {
								onBlur: methods.handleSubmit(onSubmitChop),
								valueAsNumber: true,
							})}
							defaultValue={DetailItem.chop_count === null ? 0 : DetailItem.chop_count}
							tabIndex={1}
							type='number'
							className='form-control'
							disabled={Number(DetailItem.thickness) > 5 ? true : false}
							required
							min='0'
						/>
					</Tooltip>
				</div>
				<div className={styles.line + ' ' + styles.orange}>
					<input
						{...methods.register('chop_cost', {
							onBlur: methods.handleSubmit(onSubmitPriceChop),
							valueAsNumber: true,
						})}
						defaultValue={DetailItem.chop_cost === null ? 0 : DetailItem.chop_cost}
						tabIndex={2}
						type='number'
						step='0.1'
						onFocus={e =>
							e.target.addEventListener(
								'wheel',
								function (e) {
									e.preventDefault()
								},
								{ passive: false }
							)
						}
						disabled={isDisabledChop}
						className='form-control'
					/>
				</div>

				<div className={styles.line + ' ' + styles.blue}>
					<FormSelectRoll
						detailData={DetailItem}
						selected={DetailItem.rolling_type}
						name='rolling_type'
						disabled={Number(DetailItem.thickness) > 5 ? true : false}
						onSubmit={methods.handleSubmit(onSubmitRolling)}
					/>
				</div>
				<div className={styles.line + ' ' + styles.blue}>
					<input
						{...methods.register('rolling', {
							onBlur: methods.handleSubmit(onSubmitPrice),
							valueAsNumber: true,
						})}
						disabled={Number(DetailItem.thickness) > 5 ? true : false}
						defaultValue={DetailItem.rolling === null ? 0 : DetailItem.rolling}
						tabIndex={7}
						type='number'
						onFocus={e =>
							e.target.addEventListener(
								'wheel',
								function (e) {
									e.preventDefault()
								},
								{ passive: false }
							)
						}
						step='0.1'
						min='0'
						className='form-control'
					/>
				</div>

				<div className={styles.line + ' ' + styles.red}>
					<input
						{...methods.register('polymer', {
							onBlur: methods.handleSubmit(onSubmitPainting),
						})}
						defaultValue={DetailItem.polymer === null ? '' : DetailItem.polymer}
						tabIndex={5}
						type='text'
						className='form-control'
					/>
				</div>
				<div className={styles.line + ' ' + styles.red}>
					<Controller
						control={methods.control}
						name={'polymer_options'}
						defaultValue={DetailItem.polymer_options}
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
					{...methods.register('polymer_base_price')}
					defaultValue={DetailItem.polymer_base_price === null ? 0 : DetailItem.polymer_base_price}
					tabIndex={6}
					type='hidden'
				/>
				<input
					{...methods.register('polymer_price', {
						onBlur: methods.handleSubmit(onSubmitPolymerPrice),
						valueAsNumber: true,
					})}
					defaultValue={DetailItem.polymer_price === null ? 0 : DetailItem.polymer_price}
					tabIndex={6}
					type='hidden'
					onFocus={e =>
						e.target.addEventListener(
							'wheel',
							function (e) {
								e.preventDefault()
							},
							{ passive: false }
						)
					}
					step='0.1'
					min='0'
					className='form-control'
				/>
				<div className={styles.line + ' ' + styles.red}>
					<input
						{...methods.register('polymer_one_element_price', {
							onBlur: methods.handleSubmit(onSubmitPrice),
							valueAsNumber: true,
						})}
						defaultValue={DetailItem.polymer_one_element_price === null ? 0 : DetailItem.polymer_one_element_price}
						tabIndex={6}
						type='number'
						onFocus={e =>
							e.target.addEventListener(
								'wheel',
								function (e) {
									e.preventDefault()
								},
								{ passive: false }
							)
						}
						step='0.1'
						min='0'
						className='form-control'
					/>
				</div>

				<div className={styles.line + ' ' + styles.purple}>
					<input
						{...methods.register('drowing', {
							onBlur: methods.handleSubmit(onSubmitPrice),
							valueAsNumber: true,
						})}
						defaultValue={DetailItem.drowing === null || '' ? 0 : DetailItem.drowing}
						tabIndex={8}
						type='number'
						onFocus={e =>
							e.target.addEventListener(
								'wheel',
								function (e) {
									e.preventDefault()
								},
								{ passive: false }
							)
						}
						step='0.1'
						min='0'
						className='form-control'
					/>
				</div>

				<div className={styles.line}>{detailCost}</div>
			</form>
		</FormProvider>
	)
}
