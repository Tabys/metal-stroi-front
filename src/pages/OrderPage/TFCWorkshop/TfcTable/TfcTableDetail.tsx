import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import { TFCDetail, TFCTotal } from '../../../../models'
import styles from './style.module.css'
import apiClient from '../../../../components/apiClient'
import { FaXmark } from 'react-icons/fa6'

type TfcTableDetailProps = {
	detail: TFCDetail
	total: TFCTotal
	index: number
	onUpdate: () => void
	openAlert: (type: string, massage?: string) => void
}

export function TfcTableDetail({ detail, total, index, onUpdate, openAlert }: TfcTableDetailProps) {
	const { register, handleSubmit, reset, setValue } = useForm<TFCDetail>({
		defaultValues: {
			name: detail.name,
			quantity: detail.quantity,
			milling_setup_time: detail.milling_setup_time,
			turning_setup_time: detail.turning_setup_time,
			tools: detail.tools,
			other_workshops_works: detail.other_workshops_works,
			other: detail.other,
			milling_time: detail.milling_time,
			turning_time: detail.turning_time,
			universal_time: detail.universal_time,
			erosion_time: detail.erosion_time,
			grinding_time: detail.grinding_time,
			outsourcing: detail.outsourcing,
			material: detail.material,
			defect_extra: detail.defect_extra,
			complexity_extra: detail.complexity_extra,
		},
	})

	const handleNumberInputChange = (field: keyof TFCDetail) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value === '') {
			setValue(field, 0)
		}
	}

	const handleWheelPrevent = (e: React.FocusEvent<HTMLInputElement>) => {
		e.target.addEventListener(
			'wheel',
			function (e) {
				e.preventDefault()
			},
			{ passive: false }
		)
	}

	useEffect(() => {
		reset({
			name: detail.name || '',
			quantity: detail.quantity || 0,
			milling_setup_time: detail.milling_setup_time || 0,
			turning_setup_time: detail.turning_setup_time || 0,
			tools: detail.tools || 0,
			other_workshops_works: detail.other_workshops_works || 0,
			other: detail.other || 0,
			milling_time: detail.milling_time || 0,
			turning_time: detail.turning_time || 0,
			universal_time: detail.universal_time || 0,
			erosion_time: detail.erosion_time || 0,
			grinding_time: detail.grinding_time || 0,
			outsourcing: detail.outsourcing || 0,
			material: detail.material || 0,
			defect_extra: detail.defect_extra || 0,
			complexity_extra: detail.complexity_extra || 0,
		})
	}, [detail, reset])

	const onSubmit: SubmitHandler<TFCDetail> = async data => {
		data.id = detail.id
		await apiClient
			.put<TFCDetail>('tfc-details/', data)
			.then(result => {
				onUpdate()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	const onSubmitDel: SubmitHandler<TFCDetail> = async data => {
		data.id = detail.id
		await apiClient
			.delete<TFCDetail>('tfc-details/', { data })
			.then(result => {
				onUpdate()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	return (
		<form className={styles.row}>
			<div className={styles.line}>
				<p>{index + 1}</p>
			</div>
			<div className={styles.line + ' ' + styles.name}>
				<input
					{...register('name', {
						onBlur: handleSubmit(onSubmit),
					})}
					type='text'
					className='form-control'
				/>
			</div>
			<div className={styles.line}>
				<input
					{...register('quantity', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('quantity')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.orange}>
				<input
					{...register('milling_setup_time', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleWheelPrevent}
					onChange={handleNumberInputChange('milling_setup_time')}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.orange}>
				<input
					{...register('turning_setup_time', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleWheelPrevent}
					onChange={handleNumberInputChange('turning_setup_time')}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.orange}>
				<input
					{...register('tools', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('tools')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.orange}>
				<input
					{...register('other_workshops_works', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('other_workshops_works')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.orange}>
				<input
					{...register('other', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('other')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.yellow}>
				<input
					{...register('milling_time', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('milling_time')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.yellow}>
				<input
					{...register('turning_time', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('turning_time')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.yellow}>
				<input
					{...register('universal_time', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('universal_time')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.yellow}>
				<input
					{...register('erosion_time', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('erosion_time')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.yellow}>
				<input
					{...register('grinding_time', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('grinding_time')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.purple}>
				<input
					{...register('outsourcing', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('outsourcing')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.purple}>
				<input
					{...register('material', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('material')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.green}>
				<input
					{...register('defect_extra', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('defect_extra')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.green}>
				<input
					{...register('complexity_extra', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('complexity_extra')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.blue}>{total.details_costs.find(item => item.id === detail.id)?.cost.toFixed(3)}</div>

			<div className={styles.line}>
				<button type='submit' onClick={handleSubmit(onSubmitDel)} className='btn btn-link'>
					<FaXmark />
				</button>
			</div>
		</form>
	)
}
