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
			setup_time: detail.setup_time,
			tools: detail.tools,
			other_workshops_works: detail.other_workshops_works,
			other: detail.other,
			machine_time: detail.machine_time,
			locksmiths_works: detail.locksmiths_works,
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
			setup_time: detail.setup_time || 0,
			tools: detail.tools || 0,
			other_workshops_works: detail.other_workshops_works || 0,
			other: detail.other || 0,
			machine_time: detail.machine_time || 0,
			locksmiths_works: detail.locksmiths_works || 0,
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
			<div className={styles.line}>
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
					{...register('setup_time', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleWheelPrevent}
					onChange={handleNumberInputChange('setup_time')}
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
					{...register('machine_time', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('machine_time')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.yellow}>
				<input
					{...register('locksmiths_works', {
						onBlur: handleSubmit(onSubmit),
						valueAsNumber: true,
					})}
					type='number'
					onFocus={handleNumberInputChange('locksmiths_works')}
					onChange={handleWheelPrevent}
					min={0}
					className='form-control'
				/>
			</div>

			<div className={styles.line + ' ' + styles.yellow}>
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

			<div className={styles.line + ' ' + styles.yellow}>
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

			<div className={styles.line + ' ' + styles.blue}>{total.details_costs.find(item => item.id === detail.id)?.cost}</div>

			<div className={styles.line}>
				<button type='submit' onClick={handleSubmit(onSubmitDel)} className='btn btn-link'>
					<FaXmark />
				</button>
			</div>
		</form>
	)
}
