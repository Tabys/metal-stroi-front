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
				setValue('milling_works_cost', Number(tfcData?.milling_works_cost))
				setValue('turning_works_cost', Number(tfcData?.turning_works_cost))
				setValue('universal_works_cost', Number(tfcData?.universal_works_cost))
				setValue('erosion_works_cost', Number(tfcData?.erosion_works_cost))
				setValue('grinding_works_cost', Number(tfcData?.grinding_works_cost))
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
					<p>Тариф фрезер ЧПУ</p>
				</div>
				<div className={styles.small + ' ' + styles.line}>
					<img src='/images/header-table/ruble-min.png' alt='ruble' />
					<p>Тариф токарный ЧПУ</p>
				</div>
				<div className={styles.small + ' ' + styles.line}>
					<img src='/images/header-table/ruble-min.png' alt='ruble' />
					<p>Тариф универсальные работы</p>
				</div>
				<div className={styles.small + ' ' + styles.line}>
					<img src='/images/header-table/ruble-min.png' alt='ruble' />
					<p>Тариф эрозия</p>
				</div>
				<div className={styles.small + ' ' + styles.line}>
					<img src='/images/header-table/ruble-min.png' alt='ruble' />
					<p>Тариф шлифовка</p>
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
						defaultValue={tfcData?.milling_works_cost ? tfcData?.milling_works_cost : 0}
						type='number'
						{...register('milling_works_cost', {
							onBlur: handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
					/>
				</div>
				<div className={styles.line}>
					<input
						className='form-control'
						defaultValue={tfcData?.turning_works_cost ? tfcData?.turning_works_cost : 0}
						type='number'
						{...register('turning_works_cost', {
							onBlur: handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
					/>
				</div>
				<div className={styles.line}>
					<input
						className='form-control'
						defaultValue={tfcData?.universal_works_cost ? tfcData?.universal_works_cost : 0}
						type='number'
						{...register('universal_works_cost', {
							onBlur: handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
					/>
				</div>
				<div className={styles.line}>
					<input
						className='form-control'
						defaultValue={tfcData?.erosion_works_cost ? tfcData?.erosion_works_cost : 0}
						type='number'
						{...register('erosion_works_cost', {
							onBlur: handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
					/>
				</div>
				<div className={styles.line}>
					<input
						className='form-control'
						defaultValue={tfcData?.grinding_works_cost ? tfcData?.grinding_works_cost : 0}
						type='number'
						{...register('grinding_works_cost', {
							onBlur: handleSubmit(onSubmit),
							valueAsNumber: true,
						})}
					/>
				</div>
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
