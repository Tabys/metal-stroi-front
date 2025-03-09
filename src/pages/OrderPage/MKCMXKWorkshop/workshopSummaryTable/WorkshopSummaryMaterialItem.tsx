import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../workshopProductsTable/style.module.css'
import { ChangeSummeryMaterialType, WorkshopMaterialType } from '../../../../models'
import apiClient from '../../../../components/apiClient'
import { useEffect } from 'react'

type WorkshopSummaryMaterialItemProps = {
	material: WorkshopMaterialType
	order_id?: number
	onUpdate: () => void
	openAlert: (type: string, massage?: string) => void
}

export function WorkshopSummaryMaterialItem({ material, order_id, onUpdate, openAlert }: WorkshopSummaryMaterialItemProps) {
	const { register, handleSubmit, setValue } = useForm<ChangeSummeryMaterialType>()

	useEffect(() => {
		setValue('quantity', material.quantity)
	}, [material, setValue])

	const onSubmit: SubmitHandler<ChangeSummeryMaterialType> = async data => {
		data.order_id = order_id
		data.workshops_material_id = material.id
		await apiClient
			.post<ChangeSummeryMaterialType>('workshops-product-material/summary-change', data)
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
					{...register('quantity', { onBlur: handleSubmit(onSubmit), valueAsNumber: true })}
					step={0.01}
					min={0}
					defaultValue={material.quantity}
					type='number'
					className='form-control'
				/>
			</div>
			<div className={styles.td}>{(material.price * material.quantity).toFixed(2)}</div>
		</form>
	)
}
