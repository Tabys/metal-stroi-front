import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Order, Rates, WorkshopData, WorkshopTotalData } from '../../../../models'
import styles from './style.module.css'
import apiClient from '../../../../components/apiClient'

type WorkshopTableProps = {
	order?: Order
	rates: Rates[]
	onCreate: () => void
	openAlert: (type: string, massage?: string) => void
	total: WorkshopTotalData
}

export function WorkshopsTable({ order, rates, total, onCreate, openAlert }: WorkshopTableProps) {
	const { control, register, handleSubmit } = useForm<WorkshopData>()

	const onSubmit: SubmitHandler<WorkshopData> = async data => {
		data.id = order?.workshops_data?.id
		if (data.profit < 15) {
			openAlert('danger', 'Прибыль не может быть меньше 15%')
			return
		}
		await apiClient
			.put<WorkshopData>('workshops-data/', data)
			.then(result => {
				onCreate()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	const onSubmitRate: SubmitHandler<WorkshopData> = async data => {
		data.id = order?.workshops_data?.id
		data.rate = rates.find(rate => rate.bx_id === Number(data.payment_form))?.value

		await apiClient
			.put<WorkshopData>('workshops-data/', data)
			.then(result => {
				onCreate()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	return (
		<>
			<div className={styles.workshops_list}>
				<div className={styles.row + ' ' + styles.header}>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/payment_form.png' alt='payment-form' />
						<p>Форма оплаты</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/outsourcing.png' alt='outsourcing' />
						<p>Аутсорс</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/business_trip.png' alt='business-trip' />
						<p>Командировочные</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/package-min.png' alt='delivery' />
						<p>Доставка</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/profit.png' alt='profit' />
						<p>Прибыль,%</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/install.png' alt='install' />
						<p>Монтаж</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/painting.png' alt='painting' />
						<p>Покраска</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/color-palette-min.png' alt='polymer' />
						<p>Полимерка</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/tmc.png' alt='tmc' />
						<p>ТМЦ</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/works.png' alt='works' />
						<p>Работы</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/mk_works.png' alt='metal' />
						<p>Металл</p>
					</div>
					<div className={styles.small + ' ' + styles.line}>
						<img src='/images/header-table/free-icon-money-bag-5584203-min.png' alt='cost' />
						<p>Итого</p>
					</div>
				</div>
				<form className={styles.row}>
					<div className={styles.line}>
						<Controller
							name='payment_form'
							control={control}
							defaultValue={order?.workshops_data?.payment_form}
							render={({ field }) => (
								<select
									{...field}
									onChange={e => {
										field.onChange(e)
										handleSubmit(onSubmitRate)()
									}}
									className='form-select'
								>
									{rates.map(rate => (
										<option key={rate.id} value={rate.bx_id}>
											{rate.name}
										</option>
									))}
								</select>
							)}
						/>
					</div>
					<div className={styles.line}>
						<input
							className='form-control'
							defaultValue={order?.workshops_data?.outsourcing ? order?.workshops_data.outsourcing : 0}
							type='number'
							{...register('outsourcing', {
								onBlur: handleSubmit(onSubmit),
								valueAsNumber: true,
							})}
						/>
					</div>
					<div className={styles.line}>
						<input
							className='form-control'
							defaultValue={order?.workshops_data?.business_trip ? order?.workshops_data.business_trip : 0}
							type='number'
							{...register('business_trip', {
								onBlur: handleSubmit(onSubmit),
								valueAsNumber: true,
							})}
						/>
					</div>
					<div className={styles.line}>
						<input
							className='form-control'
							defaultValue={order?.workshops_data?.delivery ? order?.workshops_data.delivery : 0}
							type='number'
							{...register('delivery', {
								onBlur: handleSubmit(onSubmit),
								valueAsNumber: true,
							})}
						/>
					</div>
					<div className={styles.line}>
						<input
							className='form-control'
							defaultValue={order?.workshops_data?.profit ? order?.workshops_data.profit : 0}
							type='number'
							min={15}
							{...register('profit', {
								onBlur: handleSubmit(onSubmit),
								valueAsNumber: true,
							})}
						/>
					</div>
					<div className={styles.line}>{total.installation}</div>
					<div className={styles.line}>{total.painting}</div>
					<div className={styles.line}>{total.polymer}</div>
					<div className={styles.line}>{total.tmc}</div>
					<div className={styles.line}>{total.work}</div>
					<div className={styles.line}>{total.metal.toFixed(1)}</div>
					<div className={styles.line}>{total.cost}</div>
				</form>
			</div>
		</>
	)
}
