import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { AddWorkshopMaterialType, WorkshopProduct } from '../../../../../models'
import apiClient from '../../../../../components/apiClient'
import { Button } from 'react-bootstrap'
import styles from '../style.module.css'
import Select from 'react-select'
import { useWorkshopMaterials } from '../../../../../hooks/useWorkshopMaterials'
import { WorkshopMaterialItem } from './workshopMaterialItem'
import { FaXmark } from 'react-icons/fa6'

type Materials = {
	materials: AddWorkshopMaterialType[]
}

type WorkshopMaterialProps = {
	product: WorkshopProduct
	onCreate: () => void
	openAlert: (type: string, massage?: string) => void
}

export function AddWorkshopMaterial({ product, onCreate, openAlert }: WorkshopMaterialProps) {
	const { workshopMaterial } = useWorkshopMaterials()
	const options: any[] = workshopMaterial
		.filter(material => !product.workshops_materials.some(m => m.id === material.id))
		.map(material => ({ label: material.name, value: material.id }))

	const { control, register, handleSubmit } = useForm<Materials>()

	const onSubmit: SubmitHandler<Materials> = async data => {
		await apiClient
			.post<Materials>('workshops-product-material', data)
			.then(result => {
				onCreate()
				remove()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	const { fields, append, remove } = useFieldArray<Materials>({
		control,
		name: 'materials',
	})

	return (
		<>
			<div className={styles.table}>
				<div className={styles.tbody}>
					<div className={styles.tr + ' ' + styles.thead}>
						<div className={styles.td}>Наименование</div>
						<div className={styles.td}>Количество материала (в ед. изм.)</div>
						<div className={styles.td}>Цена за единицу</div>
						<div className={styles.td}></div>
					</div>

					{product.workshops_materials.map(material => (
						<WorkshopMaterialItem key={material.id} product_id={product.id} material={material} onUpdate={onCreate} openAlert={openAlert} />
					))}
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.tbody}>
					{fields.map((field, index) => (
						<div key={field.id} className={styles.tr}>
							<div className={styles.td}>
								<Controller
									control={control}
									name={`materials.${index}.workshops_material_id`}
									render={({ field: { onChange, value, ref } }) => (
										<Select
											options={options}
											value={options.find(c => c.value === value)}
											onChange={val => onChange(val.value)}
											isSearchable={true}
										/>
									)}
								/>
							</div>
							<div className={styles.td}>
								<input
									{...register(`materials.${index}.base_quantity`, { valueAsNumber: true })}
									type='number'
									step={0.01}
									min={0}
									className='form-control'
								/>
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
						<Button type='button' onClick={() => append({ base_quantity: 1, workshops_product_id: product.id, workshops_material_id: undefined })}>
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
		</>
	)
}
