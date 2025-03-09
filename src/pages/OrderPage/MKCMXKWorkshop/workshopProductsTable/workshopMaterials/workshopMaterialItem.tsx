import { SubmitHandler, useForm } from 'react-hook-form'
import { AddWorkshopMaterialType, WorkshopMaterialType } from '../../../../../models'
import apiClient from '../../../../../components/apiClient'
import styles from '../style.module.css'
import { FaXmark } from 'react-icons/fa6'

type WorkshopMaterialItemProps = {
	material: WorkshopMaterialType
	product_id: number
	onUpdate: () => void
	openAlert: (type: string, massage?: string) => void
}

export function WorkshopMaterialItem({ material, product_id, onUpdate, openAlert }: WorkshopMaterialItemProps) {
	const { register, handleSubmit } = useForm<AddWorkshopMaterialType>()

	const onSubmit: SubmitHandler<AddWorkshopMaterialType> = async data => {
		data.workshops_material_id = material.id
		data.workshops_product_id = product_id
		data.actual_quantity = data.base_quantity

		await apiClient
			.put<AddWorkshopMaterialType>('workshops-product-material', data)
			.then(result => {
				onUpdate()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	const onSubmitDel: SubmitHandler<AddWorkshopMaterialType> = async data => {
		data.workshops_material_id = material.id
		data.workshops_product_id = product_id

		await apiClient
			.delete<AddWorkshopMaterialType>('workshops-product-material', { data })
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
			<div className={styles.td}>{material.name}</div>
			<div className={styles.td}>
				<input
					{...register('base_quantity', { onBlur: handleSubmit(onSubmit), valueAsNumber: true })}
					defaultValue={material.workshops_product_material.base_quantity}
					step={0.01}
					min={0}
					type='number'
					className='form-control'
				/>
			</div>
			<div className={styles.td}>{material.price}</div>
			<div className={styles.td}>
				<button type='submit' onClick={handleSubmit(onSubmitDel)} className='btn btn-link'>
					<FaXmark />
				</button>
			</div>
		</form>
	)
}
