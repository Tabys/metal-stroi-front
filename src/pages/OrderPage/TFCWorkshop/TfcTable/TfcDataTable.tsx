import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { TFCData, Rates } from '../../../../models'
import styles from './style.module.css'
import apiClient from '../../../../components/apiClient'
import { useEffect } from 'react'
import { UpdProfit } from '../../../../components/UpdProfit/UpdProfit'

type TfcDataTableProps = {
	tfcData?: TFCData
	rates: Rates[]
	onUpdate: () => void
	openAlert: (type: string, massage?: string) => void
}

export function TfcDataTable({ rates, tfcData, onUpdate, openAlert }: TfcDataTableProps) {
	const { control, register, setValue, handleSubmit } = useForm<TFCData>()

	useEffect(() => {
		setValue('payment_form', Number(tfcData?.payment_form))
	}, [setValue, tfcData, tfcData?.payment_form])

	const onSubmit: SubmitHandler<TFCData> = async data => {
		data.id = tfcData?.id
		if (data.profit < 15) {
			openAlert('danger', 'Прибыль не может быть меньше 15%')
			return
		}
		await apiClient
			.put<TFCData>('tfc-data/', data)
			.then(result => {
				onUpdate()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	const onSubmitRate: SubmitHandler<TFCData> = async data => {
		data.id = tfcData?.id
		data.rate = rates.find(rate => rate.bx_id === Number(data.payment_form))?.value

		await apiClient
			.put<TFCData>('tfc-data/', data)
			.then(result => {
				onUpdate()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	return (
		<div className={styles.detail_list + ' mb-3'}>
			<div className={styles.row + ' ' + styles.header}>
				<div className={styles.small + ' ' + styles.line}>
					<img src='/images/header-table/payment_form.png' alt='payment_form' />
					<p>Форма оплаты</p>
				</div>
				<div className={styles.small + ' ' + styles.line}>
					<img src='/images/header-table/ruble-min.png' alt='ruble' />
					<p>Стоимость машиночаса</p>
				</div>
				<div className={styles.small + ' ' + styles.line}>
					<img src='/images/header-table/ruble-min.png' alt='ruble' />
					<p>Стоимость часа наладки</p>
				</div>
				<div className={styles.small + ' ' + styles.line}>
					<img src='/images/header-table/package-min.png' alt='delivery' />
					<p>Доставка, руб</p>
				</div>
				<div className={styles.small + ' ' + styles.line}>
					<img src='/images/header-table/profit.png' alt='delivery' />
					<p>Ставка прибыли</p>
				</div>
			</div>

			<div className={styles.row}>
				<div className={styles.line}>
					<Controller
						name='payment_form'
						control={control}
						defaultValue={tfcData?.payment_form}
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
						defaultValue={tfcData?.machine_cost ? tfcData?.machine_cost : 0}
						type='number'
						{...register('machine_cost', {
							onBlur: handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
					/>
				</div>
				<div className={styles.line}>{tfcData?.machine_cost ? tfcData?.machine_cost / 2 : 0}</div>
				<div className={styles.line}>
					<input
						className='form-control'
						defaultValue={tfcData?.delivery ? tfcData?.delivery : 0}
						type='number'
						{...register('delivery', {
							onBlur: handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
					/>
				</div>
				<div className={styles.line}>
					<div className={styles.profit}>
						<UpdProfit profit={Number(tfcData?.profit)} tfcId={tfcData?.id} update={onUpdate} openAlert={openAlert} />
					</div>
				</div>
			</div>
		</div>
	)
}
