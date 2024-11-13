import axios from 'axios'
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form'
import { Detail, DocTableDetail, Order, PaintingMods } from '../../../models'
import styles from './style.module.css'
import { UpdCutInset } from './updPrices/updCutInset'
import { UpdBandChop } from './updPrices/updBendChop'
import { FormRadio } from './formElements/formRadio'
import { useEffect, useState } from 'react'
import Tooltip from '../../../components/Tooltip'
import { UpdRollings } from './updPrices/updRollings'
import { FormSelectRoll } from './formElements/formSelectRoll'
import { UpdPainting } from './updPrices/updPainting'
import Select from 'react-select'
import { UpdPaintingOption } from './updPrices/updPaintingOption'
import { postConditions } from './component/postConditions/postConditions'
import { culcMetalPriceOneDetail } from './component/culcMetalPriceOneDetail/culcMetalPriceOneDetail'
import { culcCostDetail } from './component/culcCostDetails/culcCostDetails'

type FormDetailItemProps = {
	orderData: Order
	DetailItem: Detail
	editedDetails: DocTableDetail[] | undefined
	index: number
	delivery: number
	paintingMods: PaintingMods[]
	updDetail: () => void
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
}: FormDetailItemProps) {
	const methods = useForm<Detail>()

	const [isDisabledPP, setIsDisabledPP] = useState(DetailItem.polymer_price === null || DetailItem.polymer_price == 0 ? true : false)
	const [isDisabledChop, setIsDisabledChop] = useState(DetailItem.chop_count === null || DetailItem.chop_count == 0 ? true : false)
	const [isDisabledBend, setIsDisabledBend] = useState(DetailItem.bends_count === null || DetailItem.bends_count == 0 ? true : false)
	const [metalPriceOneDetail, setMetalPriceOneDetail] = useState('')
	const [detailCost, setDetailCost] = useState(0)

	const options: any[] = paintingMods.map(paintingMod => {
		return {
			value: paintingMod.id,
			label: paintingMod.name,
		}
	})

	useEffect(() => {
		methods.reset()
		setMetalPriceOneDetail(culcMetalPriceOneDetail({ order: orderData, detail: DetailItem }))
		setDetailCost(culcCostDetail({ detailsInProduct: editedDetails, detailOutProduct: DetailItem, delivery }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderData])

	const onSubmitBendChop: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await axios.put<Detail>(process.env.REACT_APP_BACKEND_API_URL + 'detail/', await UpdBandChop(data))
		await methods.setValue('bend_cost', data.bend_cost)
		await methods.setValue('chop_cost', data.chop_cost)
		await updDetail()
		setIsDisabledChop(data.chop_count !== 0 ? false : true)
		setIsDisabledBend(data.bends_count !== 0 ? false : true)
	}

	const onSubmitCutInset: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await axios.put<Detail>(process.env.REACT_APP_BACKEND_API_URL + 'detail/', await UpdCutInset(data))

		await methods.setValue('cut_cost', data.cut_cost)
		await methods.setValue('inset_cost', data.inset_cost)
		await updDetail()
	}

	const onSubmitRolling: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await axios.put<Detail>(process.env.REACT_APP_BACKEND_API_URL + 'detail/', await UpdRollings(data))

		await methods.setValue('rolling', data.rolling)
		if (data.rolling_type === 'rolling_cone' && Number(DetailItem.thickness) === 2) {
			await rollAlert()
		}
		await updDetail()
	}

	const onSubmitPainting: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await axios.put<Detail>(process.env.REACT_APP_BACKEND_API_URL + 'detail/', await UpdPainting(data))
		await methods.setValue('polymer_price', Number.isNaN(data.polymer_price) ? 0 : data.polymer_price)
		await methods.setValue('polymer_base_price', Number.isNaN(data.polymer_base_price) ? 0 : data.polymer_base_price)
		await setIsDisabledPP(data.polymer_price !== 0 ? false : true)
		await updDetail()
	}

	const onSubmitOptionPainting: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await axios.put<Detail>(process.env.REACT_APP_BACKEND_API_URL + 'detail/', await UpdPaintingOption({ dataDetail: data, paintingMods: paintingMods }))
		await methods.setValue('polymer_price', Number.isNaN(data.polymer_price) ? 0 : data.polymer_price)
		await updDetail()
	}

	const onSubmitPolymerPrice: SubmitHandler<Detail> = async data => {
		data.polymer_base_price = data.polymer_price
		data.polymer_options = []
		delete data.metal_cost
		await axios.put<Detail>(process.env.REACT_APP_BACKEND_API_URL + 'detail/', data)
		await methods.setValue('polymer_options', [])
		await methods.setValue('polymer_base_price', data.polymer_price)
		await setIsDisabledPP(data.polymer_price !== 0 ? false : true)
		await updDetail()
	}

	const onSubmitPrice: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await axios.put<Detail>(process.env.REACT_APP_BACKEND_API_URL + 'detail/', data)
		await updDetail()
	}

	const onSubmitPriceChop: SubmitHandler<Detail> = async data => {
		const { access, choping } = await postConditions({
			order: orderData,
			detail: data,
			type: 'chop-bend',
		})
		if (Number(data.chop_cost) >= Number(choping?.cost)) {
			await axios.put<Detail>(process.env.REACT_APP_BACKEND_API_URL + 'detail/', {
				id: data.id,
				chop_cost: data.chop_cost,
			})
			DetailItem.chop_cost = data.chop_cost
			updDetail()
		} else {
			if (access === true) {
				await axios.put<Detail>(process.env.REACT_APP_BACKEND_API_URL + 'detail/', {
					id: data.id,
					chop_cost: data.chop_cost,
				})
				DetailItem.chop_cost = data.chop_cost
				updDetail()
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
			await axios.put<Detail>(process.env.REACT_APP_BACKEND_API_URL + 'detail/', {
				id: data.id,
				bend_cost: data.bend_cost,
			})
			DetailItem.bend_cost = data.bend_cost
			updDetail()
		} else {
			if (access === true) {
				await axios.put<Detail>(process.env.REACT_APP_BACKEND_API_URL + 'detail/', {
					id: data.id,
					bend_cost: data.bend_cost,
				})
				DetailItem.bend_cost = data.bend_cost
				updDetail()
			} else {
				await methods.setValue('bend_cost', DetailItem.bend_cost)
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
			await axios.put<Detail>(process.env.REACT_APP_BACKEND_API_URL + 'detail/', {
				id: data.id,
				cut_cost: data.cut_cost,
			})
			DetailItem.cut_cost = data.cut_cost
			updDetail()
		} else {
			if (access === true) {
				await axios.put<Detail>(process.env.REACT_APP_BACKEND_API_URL + 'detail/', {
					id: data.id,
					cut_cost: data.cut_cost,
				})
				DetailItem.cut_cost = data.cut_cost
				updDetail()
			} else {
				await methods.setValue('cut_cost', DetailItem.cut_cost)
				serviseAlert(cuting)
			}
		}
	}

	// const onSubmitPriceMetal: SubmitHandler<Detail> = async data => {
	// 	await axios.put<Detail>(
	// 		process.env.REACT_APP_BACKEND_API_URL + 'detail/',
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
				<div className={styles.line}>{DetailItem.quantity}</div>

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
							onBlur: methods.handleSubmit(onSubmitBendChop),
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
								onBlur: methods.handleSubmit(onSubmitBendChop),
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
				<div className={styles.line + ' ' + styles.red}>
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
