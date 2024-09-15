import axios from 'axios'
import {
	useForm,
	SubmitHandler,
	FormProvider,
	Controller,
} from 'react-hook-form'
import { Detail, Order } from '../../../models'
import styles from './style.module.css'
import { UpdCutInset } from './updPrices/updCutInset'
import { UpdBandChop } from './updPrices/updBendChop'
import { FormRadio } from './formElements/formRadio'
import { useEffect, useState } from 'react'
import Tooltip from '../../../components/Tooltip'
import { extraPrice } from './updPrices/extraPriceMetal'
import { UpdRollings } from './updPrices/updRollings'
import { FormSelectRoll } from './formElements/formSelectRoll'
import { UpdPainting } from './updPrices/updPainting'
import Select from 'react-select'
import { UpdPaintingOption } from './updPrices/updPaintingOption'
import { postConditions } from './component/postConditions/postConditions'

type FormDetailItemProps = {
	orderData: Order
	DetailItem: Detail
	index: number
	updDetail: () => void
	rollAlert: () => void
	serviseAlert: (min_price: number | undefined) => void
}

export function FormDetailItem({
	DetailItem,
	orderData,
	index,
	rollAlert,
	serviseAlert,
	updDetail,
}: FormDetailItemProps) {
	const methods = useForm<Detail>()

	const [isDisabledPP, setIsDisabledPP] = useState(
		DetailItem.polymer_price === null || DetailItem.polymer_price == 0
			? true
			: false
	)
	const [isDisabledChop, setIsDisabledChop] = useState(
		DetailItem.chop_count === null || DetailItem.chop_count == 0
			? true
			: false
	)
	const [isDisabledBend, setIsDisabledBend] = useState(
		DetailItem.bends_count === null || DetailItem.bends_count == 0
			? true
			: false
	)

	const options: any[] = [
		{ value: 'shagreen', label: 'Шагрень' },
		{ value: 'matte', label: 'Матовые' },
		{ value: 'lacquer', label: 'Лак' },
		{ value: 'big', label: 'Габаритные изделия' },
	]

	const extraPriceMetal = extraPrice(orderData)
	// Change METAL COST input value during change METAL MARKAP
	useEffect(() => {
		methods.reset()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderData])

	const onSubmitBendChop: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await axios.put<Detail>(
			process.env.REACT_APP_BACKEND_API_URL + 'detail/',
			await UpdBandChop(data)
		)
		await methods.setValue('bend_cost', data.bend_cost)
		await methods.setValue('chop_cost', data.chop_cost)
		await updDetail()
		setIsDisabledChop(data.chop_count !== 0 ? false : true)
		setIsDisabledBend(data.bends_count !== 0 ? false : true)
	}

	const onSubmitCutInset: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await axios.put<Detail>(
			process.env.REACT_APP_BACKEND_API_URL + 'detail/',
			await UpdCutInset(data)
		)

		await methods.setValue('cut_cost', data.cut_cost)
		await methods.setValue('inset_cost', data.inset_cost)
		await updDetail()
	}

	const onSubmitRolling: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await axios.put<Detail>(
			process.env.REACT_APP_BACKEND_API_URL + 'detail/',
			await UpdRollings(data)
		)

		await methods.setValue('rolling', data.rolling)
		if (
			data.rolling_type === 'rolling_cone' &&
			Number(DetailItem.thickness) === 2
		) {
			await rollAlert()
		}
		await updDetail()
	}

	const onSubmitPainting: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await axios.put<Detail>(
			process.env.REACT_APP_BACKEND_API_URL + 'detail/',
			await UpdPainting(data)
		)
		await methods.setValue(
			'polymer_price',
			Number.isNaN(data.polymer_price) ? 0 : data.polymer_price
		)
		await methods.setValue(
			'polymer_base_price',
			Number.isNaN(data.polymer_base_price) ? 0 : data.polymer_base_price
		)
		await setIsDisabledPP(data.polymer_price !== 0 ? false : true)
		await updDetail()
	}

	const onSubmitOptionPainting: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await axios.put<Detail>(
			process.env.REACT_APP_BACKEND_API_URL + 'detail/',
			await UpdPaintingOption(data)
		)
		await methods.setValue(
			'polymer_price',
			Number.isNaN(data.polymer_price) ? 0 : data.polymer_price
		)
		await updDetail()
	}

	const onSubmitPolymerPrice: SubmitHandler<Detail> = async data => {
		data.polymer_base_price = data.polymer_price
		data.polymer_options = []
		console.log(data)
		delete data.metal_cost
		// console.log(data)
		await axios.put<Detail>(
			process.env.REACT_APP_BACKEND_API_URL + 'detail/',
			data
		)
		await methods.setValue('polymer_options', [])
		await methods.setValue('polymer_base_price', data.polymer_price)
		await setIsDisabledPP(data.polymer_price !== 0 ? false : true)
		await updDetail()
	}

	const onSubmitPrice: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		// console.log(data)
		await axios.put<Detail>(
			process.env.REACT_APP_BACKEND_API_URL + 'detail/',
			data
		)
		await updDetail()
	}

	const onSubmitPriceChop: SubmitHandler<Detail> = async data => {
		console.log(data)
		const { access, choping } = await postConditions({
			order: orderData,
			detail: data,
			type: 'chop-bend',
		})
		if (Number(data.chop_cost) >= Number(choping?.cost)) {
			// console.log(data)
			await axios.put<Detail>(
				process.env.REACT_APP_BACKEND_API_URL + 'detail/',
				{
					id: data.id,
					chop_cost: data.chop_cost,
				}
			)
			DetailItem.chop_cost = data.chop_cost
			updDetail()
		} else {
			if (access === true) {
				await axios.put<Detail>(
					process.env.REACT_APP_BACKEND_API_URL + 'detail/',
					{
						id: data.id,
						chop_cost: data.chop_cost,
					}
				)
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
			// console.log(data)
			await axios.put<Detail>(
				process.env.REACT_APP_BACKEND_API_URL + 'detail/',
				{
					id: data.id,
					bend_cost: data.bend_cost,
				}
			)
			DetailItem.bend_cost = data.bend_cost
			updDetail()
		} else {
			if (access === true) {
				await axios.put<Detail>(
					process.env.REACT_APP_BACKEND_API_URL + 'detail/',
					{
						id: data.id,
						bend_cost: data.bend_cost,
					}
				)
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
		if (Number(data.cut_cost) >= Number(cuting?.cost)) {
			// console.log(data)
			await axios.put<Detail>(
				process.env.REACT_APP_BACKEND_API_URL + 'detail/',
				{
					id: data.id,
					cut_cost: data.cut_cost,
				}
			)
			DetailItem.cut_cost = data.cut_cost
			updDetail()
		} else {
			if (access === true) {
				await axios.put<Detail>(
					process.env.REACT_APP_BACKEND_API_URL + 'detail/',
					{
						id: data.id,
						cut_cost: data.cut_cost,
					}
				)
				DetailItem.cut_cost = data.cut_cost
				updDetail()
			} else {
				await methods.setValue('cut_cost', DetailItem.cut_cost)
				serviseAlert(cuting?.cost)
			}
		}
	}

	const onSubmitPriceMetal: SubmitHandler<Detail> = async data => {
		// console.log(data)
		await axios.put<Detail>(
			process.env.REACT_APP_BACKEND_API_URL + 'detail/',
			{
				id: data.id,
				metal_cost: data.metal_cost,
			}
		)
	}

	return (
		<FormProvider {...methods}>
			<form className={styles.row}>
				<input
					{...methods.register('id')}
					type='hidden'
					defaultValue={DetailItem.id}
				/>
				<input
					{...methods.register('setup_id')}
					type='hidden'
					defaultValue={DetailItem.setup_id}
				/>
				<input
					{...methods.register('thickness')}
					type='hidden'
					defaultValue={DetailItem.thickness}
				/>
				<div className={styles.line}>{index + 1} </div>
				<div className={styles.line}>{DetailItem.name}</div>
				<div className={styles.line}>{DetailItem.thickness}</div>
				<div className={styles.line}>{DetailItem.material}</div>
				<div className={styles.line}>{DetailItem.quantity}</div>
				{/* <div className={styles.line}>
					{DetailItem.cut_count === null ? 0 : DetailItem.cut_count}
				</div> */}
				<FormRadio
					name='cut_type'
					defaultValue={DetailItem.cut_type}
					data={DetailItem}
					onSubmit={methods.handleSubmit(onSubmitCutInset)}
				/>
				<div className={styles.line}>
					<Tooltip
						conditions={
							Number(DetailItem.thickness) > 5 ? true : false
						}
						text='Толщина металла должна быть < 5'
					>
						<input
							{...methods.register('chop_count', {
								onBlur: methods.handleSubmit(onSubmitBendChop),
								valueAsNumber: true,
							})}
							defaultValue={
								DetailItem.chop_count === null
									? 0
									: DetailItem.chop_count
							}
							tabIndex={1}
							type='number'
							className='form-control'
							disabled={
								Number(DetailItem.thickness) > 5 ? true : false
							}
							required
							min='0'
						/>
					</Tooltip>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('chop_cost', {
							onBlur: methods.handleSubmit(onSubmitPriceChop),
							valueAsNumber: true,
						})}
						defaultValue={
							DetailItem.chop_cost === null
								? 0
								: DetailItem.chop_cost
						}
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
				<div className={styles.line}>
					<input
						{...methods.register('bends_count', {
							onBlur: methods.handleSubmit(onSubmitBendChop),
							valueAsNumber: true,
						})}
						defaultValue={
							DetailItem.bends_count === null
								? 0
								: DetailItem.bends_count
						}
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
				<div className={styles.line}>
					<input
						{...methods.register('bend_cost', {
							onBlur: methods.handleSubmit(onSubmitPriceBend),
							valueAsNumber: true,
						})}
						defaultValue={
							DetailItem.bend_cost === null
								? 0
								: DetailItem.bend_cost
						}
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
				<div className={styles.line}>
					<input
						{...methods.register('polymer', {
							onBlur: methods.handleSubmit(onSubmitPainting),
						})}
						defaultValue={
							DetailItem.polymer === null
								? ''
								: DetailItem.polymer
						}
						tabIndex={5}
						type='text'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<Controller
						control={methods.control}
						name={'polymer_options'}
						defaultValue={DetailItem.polymer_options}
						render={({
							field: { onChange, onBlur, value, ref },
						}) => (
							<Select
								classNamePrefix='polymer-select'
								closeMenuOnSelect={false}
								isSearchable={false}
								value={options.filter(c =>
									value?.includes(c.value)
								)}
								onChange={val => {
									onChange(val.map(c => c.value))
								}}
								onBlur={methods.handleSubmit(
									onSubmitOptionPainting
								)}
								isDisabled={isDisabledPP}
								options={options}
								isMulti
								placeholder='Нажми'
							/>
						)}
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('polymer_base_price')}
						defaultValue={
							DetailItem.polymer_base_price === null
								? 0
								: DetailItem.polymer_base_price
						}
						tabIndex={6}
						type='hidden'
					/>
					<input
						{...methods.register('polymer_price', {
							onBlur: methods.handleSubmit(onSubmitPolymerPrice),
							valueAsNumber: true,
						})}
						defaultValue={
							DetailItem.polymer_price === null
								? 0
								: DetailItem.polymer_price
						}
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
				<div className={styles.line}>
					<FormSelectRoll
						detailData={DetailItem}
						selected={DetailItem.rolling_type}
						name='rolling_type'
						disabled={
							Number(DetailItem.thickness) > 5 ? true : false
						}
						onSubmit={methods.handleSubmit(onSubmitRolling)}
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('rolling', {
							onBlur: methods.handleSubmit(onSubmitPrice),
							valueAsNumber: true,
						})}
						disabled={
							Number(DetailItem.thickness) > 5 ? true : false
						}
						defaultValue={
							DetailItem.rolling === null ? 0 : DetailItem.rolling
						}
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
				<div className={styles.line}>
					<input
						{...methods.register('drowing', {
							onBlur: methods.handleSubmit(onSubmitPrice),
							valueAsNumber: true,
						})}
						defaultValue={
							DetailItem.drowing === null || ''
								? 0
								: DetailItem.drowing
						}
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
				<div className={styles.line}>
					<input
						{...methods.register('cut_cost', {
							onBlur: methods.handleSubmit(onSubmitPriceCuting),
							valueAsNumber: true,
						})}
						defaultValue={
							DetailItem.cut_cost === null
								? 0
								: DetailItem.cut_cost
						}
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
				<div className={styles.line}>
					<input
						{...methods.register('inset_cost', {
							onBlur: methods.handleSubmit(onSubmitPrice),
							valueAsNumber: true,
						})}
						defaultValue={
							DetailItem.inset_cost === null
								? 0
								: DetailItem.inset_cost
						}
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
						disabled={
							DetailItem.cut_type === 'laser' ? true : false
						}
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('metal_cost', {
							onBlur: methods.handleSubmit(onSubmitPriceMetal),
							valueAsNumber: true,
						})}
						defaultValue={
							DetailItem.metal_cost === null ||
							DetailItem.metal_cost == 0
								? 0
								: Math.round(
										Number(DetailItem.metal_cost) +
											extraPriceMetal +
											(Number(DetailItem.metal_cost) *
												orderData.markup) /
												100
								  )
						}
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
						disabled={true}
						className='form-control'
					/>
				</div>
				{/* <div className={styles.line}>
					<FormCheckbox
						name='food_steel'
						defaultChecked={DetailItem.food_steel}
						disable={
							DetailItem.material === '1.4301' ? false : true
						}
						onSubmit={methods.handleSubmit(onSubmitFoodSteel)}
					/>
				</div> */}
			</form>
		</FormProvider>
	)
}
