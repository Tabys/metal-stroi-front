import axios from 'axios'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { Detail, Order } from '../../../models'
import styles from './style.module.css'
import { UpdCutInset } from './updPrices/updCutInset'
import { UpdBandChop } from './updPrices/updBendChop'
import { UpdFoodSteel } from './updPrices/updFoodSteel'
import { FormCheckbox } from './formElements/formCheckbox'
import { FormRadio } from './formElements/formRadio'
import { useEffect } from 'react'
import Tooltip from '../../../components/Tooltip'
import { extraPrice } from './updPrices/extraPriceMetal'

type FormDetailItemProps = {
	orderData: Order
	DetailItem: Detail
	index: number
	updDetail: () => void
}

export function FormDetailItem({
	DetailItem,
	orderData,
	index,
	updDetail,
}: FormDetailItemProps) {
	const methods = useForm<Detail>()

	const extraPriceMetal = extraPrice(orderData)

	// Change METAL COST input value during change METAL MARKAP
	useEffect(() => {
		methods.reset()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderData])

	// console.log(orderData)

	const onSubmitBendChop: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		await axios.put<Detail>(
			process.env.REACT_APP_BACKEND_API_URL + 'detail/',
			await UpdBandChop(data)
		)
		await methods.setValue('bend_cost', data.bend_cost)
		await methods.setValue('chop_cost', data.chop_cost)
		await updDetail()
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

	const onSubmitFoodSteel: SubmitHandler<Detail> = async data => {
		delete data.metal_cost
		data.markup = orderData.markup
		await axios.put<Detail>(
			process.env.REACT_APP_BACKEND_API_URL + 'detail/',
			await UpdFoodSteel(data)
		)
		await methods.setValue(
			'metal_cost',
			Math.round(
				Number(data.metal_cost) +
					(Number(data.metal_cost) * orderData.markup) / 100
			)
		)
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

	const onSubmitPriceMetal: SubmitHandler<Detail> = async data => {
		// console.log(data)
		await axios.put<Detail>(
			process.env.REACT_APP_BACKEND_API_URL + 'detail/',
			{
				id: data.id,
				metal_cost: data.metal_cost,
			}
		)
		await updDetail()
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
				<input
					{...methods.register('add_id')}
					type='hidden'
					defaultValue={DetailItem.add_id}
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
							onBlur: methods.handleSubmit(onSubmitPrice),
							valueAsNumber: true,
						})}
						defaultValue={
							DetailItem.chop_cost === null
								? 0
								: DetailItem.chop_cost
						}
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
							onBlur: methods.handleSubmit(onSubmitPrice),
							valueAsNumber: true,
						})}
						defaultValue={
							DetailItem.bend_cost === null
								? 0
								: DetailItem.bend_cost
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
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('polymer', {
							onBlur: methods.handleSubmit(onSubmitPrice),
						})}
						defaultValue={
							DetailItem.polymer === null
								? ''
								: DetailItem.polymer
						}
						type='text'
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('polymer_price', {
							onBlur: methods.handleSubmit(onSubmitPrice),
							valueAsNumber: true,
						})}
						defaultValue={
							DetailItem.polymer_price === null
								? 0
								: DetailItem.polymer_price
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
						className='form-control'
					/>
				</div>
				<div className={styles.line}>
					<input
						{...methods.register('rolling', {
							onBlur: methods.handleSubmit(onSubmitPrice),
							valueAsNumber: true,
						})}
						defaultValue={
							DetailItem.rolling === null ? 0 : DetailItem.rolling
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
							onBlur: methods.handleSubmit(onSubmitPrice),
							valueAsNumber: true,
						})}
						defaultValue={
							DetailItem.cut_cost === null
								? 0
								: DetailItem.cut_cost
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
