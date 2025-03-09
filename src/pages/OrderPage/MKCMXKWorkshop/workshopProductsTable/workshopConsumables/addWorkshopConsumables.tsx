import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { AddWorkshopConsumablesType, WorkshopProduct } from '../../../../../models'
import apiClient from '../../../../../components/apiClient'
import { Button } from 'react-bootstrap'
import styles from '../style.module.css'
import { WorkshopConsumablesItem } from './workshopConsumablesItem'
import { FaXmark } from 'react-icons/fa6'

type Consumables = {
	consumables: AddWorkshopConsumablesType[]
}

type AddWorkshopConsumablesProps = {
	product: WorkshopProduct
	onCreate: () => void
	openAlert: (type: string, massage?: string) => void
}

export function AddWorkshopConsumables({ product, onCreate, openAlert }: AddWorkshopConsumablesProps) {
	const { control, register, handleSubmit } = useForm<Consumables>()

	const onSubmit: SubmitHandler<Consumables> = async data => {
		await apiClient
			.post<Consumables>('workshops-consumables/', data)
			.then(result => {
				remove()
				onCreate()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	const { fields, append, remove } = useFieldArray<Consumables>({
		control,
		name: 'consumables',
	})

	return (
		<div className={styles.table}>
			<div className={styles.tbody}>
				<div className={styles.tr + ' ' + styles.thead}>
					<div className={styles.td}>Наименование</div>
					<div className={styles.td}>Количество, шт</div>
					<div className={styles.td}>Цена за единицу</div>
					<div className={styles.td}>Итого</div>
					<div className={styles.td}></div>
				</div>
				{product.workshops_consumables.map(consumable => (
					<WorkshopConsumablesItem key={consumable.id} product_id={product.id} consumable={consumable} onUpdate={onCreate} openAlert={openAlert} />
				))}
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.tbody}>
				{fields.map((field, index) => (
					<div key={field.id} className={styles.tr}>
						<div className={styles.td}>
							<input {...register(`consumables.${index}.name`)} className='form-control' />
						</div>
						<div className={styles.td}>
							<input {...register(`consumables.${index}.quantity`, { valueAsNumber: true })} type='number' className='form-control' />
						</div>
						<div className={styles.td}>
							<input {...register(`consumables.${index}.price`, { valueAsNumber: true })} type='number' className='form-control' />
						</div>
						<div className={styles.td}>цена</div>
						<div className={styles.td}>
							<Button type='button' onClick={() => remove(index)} variant='destructive'>
								<FaXmark />
							</Button>
						</div>
					</div>
				))}

				<div className={styles.buttons}>
					<Button type='button' onClick={() => append({ name: '', quantity: 1, workshops_product_id: product.id, price: 0 })}>
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
		</div>
	)
}
