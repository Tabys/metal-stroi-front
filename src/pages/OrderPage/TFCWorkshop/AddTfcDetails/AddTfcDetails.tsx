import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { TFCDetail } from '../../../../models'
import apiClient from '../../../../components/apiClient'
import styles from './../TfcTable/style.module.css'
import { Button } from 'react-bootstrap'
import { FaXmark } from 'react-icons/fa6'

type Details = {
	details: TFCDetail[]
}

type TFCDetailProps = {
	count: number
	onCreate: () => void
	order_id?: number
	openAlert: (type: string, massage?: string) => void
}

export function AddTfcDetails({ onCreate, openAlert, order_id, count }: TFCDetailProps) {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Details>()

	const onSubmit: SubmitHandler<Details> = async data => {
		await apiClient
			.post<Details>('tfc-details', data)
			.then(result => {
				onCreate()
				remove()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	const { fields, append, remove } = useFieldArray<Details>({
		control,
		name: 'details',
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.row_group}>
			{fields.map((field, index) => (
				<div key={field.id} className={styles.row}>
					<div className={styles.line}>{count + index + 1}</div>
					<div className={styles.line}>
						<input
							{...register(`details.${index}.name`, { required: true })}
							type='text'
							className={errors.details?.[index]?.name ? 'form-control is-invalid' : 'form-control'}
						/>
					</div>
					<div className={styles.line}>
						<input {...register(`details.${index}.quantity`, { valueAsNumber: true })} type='number' min={0} className='form-control' />
					</div>

					<div className={styles.line + ' ' + styles.orange}>
						<input {...register(`details.${index}.setup_time`, { valueAsNumber: true })} type='number' min={0} className='form-control' />
					</div>
					<div className={styles.line + ' ' + styles.orange}>
						<input {...register(`details.${index}.tools`, { valueAsNumber: true })} type='number' min={0} className='form-control' />
					</div>
					<div className={styles.line + ' ' + styles.orange}>
						<input
							{...register(`details.${index}.other_workshops_works`, { valueAsNumber: true })}
							type='number'
							min={0}
							className='form-control'
						/>
					</div>
					<div className={styles.line + ' ' + styles.orange}>
						<input {...register(`details.${index}.other`, { valueAsNumber: true })} type='number' min={0} className='form-control' />
					</div>

					<div className={styles.line + ' ' + styles.yellow}>
						<input {...register(`details.${index}.machine_time`, { valueAsNumber: true })} type='number' min={0} className='form-control' />
					</div>
					<div className={styles.line + ' ' + styles.yellow}>
						<input {...register(`details.${index}.locksmiths_works`, { valueAsNumber: true })} type='number' min={0} className='form-control' />
					</div>
					<div className={styles.line + ' ' + styles.yellow}>
						<input {...register(`details.${index}.outsourcing`, { valueAsNumber: true })} type='number' min={0} className='form-control' />
					</div>
					<div className={styles.line + ' ' + styles.yellow}>
						<input {...register(`details.${index}.material`, { valueAsNumber: true })} type='number' min={0} className='form-control' />
					</div>

					<div className={styles.line + ' ' + styles.green}>
						<input {...register(`details.${index}.defect_extra`, { valueAsNumber: true })} type='number' min={0} className='form-control' />
					</div>
					<div className={styles.line + ' ' + styles.green}>
						<input {...register(`details.${index}.complexity_extra`, { valueAsNumber: true })} type='number' min={0} className='form-control' />
					</div>

					<div className={styles.line + ' ' + styles.blue}></div>

					<div className={styles.line}>
						<Button type='button' onClick={() => remove(index)} variant='destructive'>
							<FaXmark />
						</Button>
					</div>
				</div>
			))}
			<div className={styles.buttons}>
				<Button
					type='button'
					onClick={() =>
						append({
							name: '',
							quantity: 1,
							setup_time: 0,
							tools: 0,
							other_workshops_works: 0,
							other: 0,
							machine_time: 0,
							locksmiths_works: 0,
							outsourcing: 0,
							material: 0,
							defect_extra: 0,
							complexity_extra: 0,
							order_id: order_id,
						})
					}
				>
					<i className='fi fi-sr-plus' />
				</Button>
				{fields.length ? (
					<Button type='submit' className='bg-blue-500 text-white'>
						<i className='fi fi-sr-floppy-disk-pen' />
					</Button>
				) : (
					''
				)}
			</div>
		</form>
	)
}
