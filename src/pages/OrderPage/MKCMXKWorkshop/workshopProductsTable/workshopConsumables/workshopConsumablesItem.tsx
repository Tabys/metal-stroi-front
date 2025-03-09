import { SubmitHandler, useForm } from 'react-hook-form'
import { AddWorkshopConsumablesType, WorkshopConsumablesType } from '../../../../../models'
import apiClient from '../../../../../components/apiClient'
import styles from '../style.module.css'
import { FaXmark } from 'react-icons/fa6'

type WorkshopConsumablesItemProps = {
	consumable: WorkshopConsumablesType
	product_id: number
	onUpdate: () => void
	openAlert: (type: string, massage?: string) => void
}

export function WorkshopConsumablesItem({ consumable, product_id, onUpdate, openAlert }: WorkshopConsumablesItemProps) {
	const { register, handleSubmit } = useForm<WorkshopConsumablesType>()

	const onSubmit: SubmitHandler<WorkshopConsumablesType> = async data => {
		data.id = consumable.id
		await apiClient
			.put<AddWorkshopConsumablesType>('workshops-consumables', data)
			.then(result => {
				onUpdate()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	const onSubmitDel: SubmitHandler<WorkshopConsumablesType> = async data => {
		data.id = consumable.id
		await apiClient
			.delete<AddWorkshopConsumablesType>('workshops-consumables', { data })
			.then(result => {
				onUpdate()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	return (
		<form className={styles.tr}>
			<div className={styles.td}>
				<input {...register('name', { onBlur: handleSubmit(onSubmit) })} defaultValue={consumable.name} type='text' className='form-control' />
			</div>
			<div className={styles.td}>
				<input
					{...register('quantity', { onBlur: handleSubmit(onSubmit), valueAsNumber: true })}
					defaultValue={consumable.quantity}
					min={0}
					type='number'
					className='form-control'
				/>
			</div>
			<div className={styles.td}>
				<input
					{...register('price', { onBlur: handleSubmit(onSubmit), valueAsNumber: true })}
					defaultValue={consumable.price}
					step={0.01}
					min={0}
					type='number'
					className='form-control'
				/>
			</div>
			<div className={styles.td}>{consumable.price * consumable.quantity}</div>
			<div className={styles.td}>
				<button type='submit' onClick={handleSubmit(onSubmitDel)} className='btn btn-link'>
					<FaXmark />
				</button>
			</div>
		</form>
	)
}
