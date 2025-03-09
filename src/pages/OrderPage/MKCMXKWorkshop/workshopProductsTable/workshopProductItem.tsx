import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { PaintingMods, Rates, WorkshopData, WorkshopProduct } from '../../../../models'
import apiClient from '../../../../components/apiClient'
import styles from './style.module.css'
import Select from 'react-select'
import { AddWorkshopMaterial } from './workshopMaterials/addWorkshopMaterial'
import { AddWorkshopConsumables } from './workshopConsumables/addWorkshopConsumables'
import { workshopProductTotalData } from '../workshopTotalData/workshopProductTotalData'
import Tooltip from '../../../../components/Tooltip'
import { PPHint } from '../../LaserWorkshop/detailList/component/ppHint/ppHint'

type WorkshopProductItemProps = {
	product: WorkshopProduct
	rates: Rates[]
	workshopData?: WorkshopData
	paintingMods: PaintingMods[]
	allMaterialWeight: number
	onCreate: () => void
	openAlert: (type: string, massage?: string) => void
}

export function WorkshopProductItem({ product, rates, workshopData, allMaterialWeight, paintingMods, onCreate, openAlert }: WorkshopProductItemProps) {
	const options: any[] = paintingMods.map(paintingMod => {
		return {
			value: paintingMod.id,
			label: <i className={'fi ' + paintingMod.icon}></i>,
		}
	})
	const total = workshopProductTotalData({ product, rates, workshopData, allMaterialWeight })

	const { control, register, handleSubmit } = useForm<WorkshopProduct>()

	const onSubmit: SubmitHandler<WorkshopProduct> = async data => {
		data.id = product.id
		await apiClient
			.put<WorkshopProduct>('workshops-products/', data)
			.then(result => {
				onCreate()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	return (
		<div className={styles.products}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.flex}>
					<div className={styles.group}>
						<div className={styles.table + ' ' + styles.fullheight}>
							<div className={styles.tr + ' ' + styles.thead}>
								<div className={styles.td + ' ' + styles.wide}>Наименование позиции</div>
								<div className={styles.td}>Количество</div>
								<div className={styles.td}>Цена</div>
							</div>

							<div className={styles.tr}>
								<div className={styles.td + ' ' + styles.wide}>
									<input
										type='text'
										{...register('name', { onBlur: handleSubmit(onSubmit) })}
										defaultValue={product.name}
										className='form-control'
									/>
								</div>
								<div className={styles.td}>
									<input
										type='number'
										{...register('quantity', { onBlur: handleSubmit(onSubmit), valueAsNumber: true })}
										defaultValue={product.quantity ? product.quantity : 0}
										className='form-control'
									/>
								</div>
								<div className={styles.td}>{total.price}</div>
							</div>
						</div>
					</div>

					<div className={styles.group}>
						<div className={styles.table + ' ' + styles.fullheight}>
							<div className={styles.tr + ' ' + styles.thead}>
								<div className={styles.td + ' ' + styles.orange}></div>
								<div className={styles.td + ' ' + styles.orange}>Работы</div>
								<div className={styles.td + ' ' + styles.orange}>Монтаж</div>
								<div className={styles.td + ' ' + styles.orange}>Покраска</div>
								<div className={styles.td + ' ' + styles.orange}>
									<Tooltip conditions={true} text={<PPHint paintingMods={paintingMods} />}>
										<p>Полимерка</p>
									</Tooltip>
								</div>
							</div>

							<div className={styles.tr}>
								<div className={styles.td + ' ' + styles.orange}>Время, час</div>
								<div className={styles.td}>
									<input
										type='number'
										{...register('work_time', { onBlur: handleSubmit(onSubmit), valueAsNumber: true })}
										defaultValue={product.work_time ? product.work_time : 0}
										className='form-control'
									/>
								</div>
								<div className={styles.td}>
									<input
										type='number'
										{...register('installation_time', { onBlur: handleSubmit(onSubmit), valueAsNumber: true })}
										defaultValue={product.installation_time ? product.installation_time : 0}
										className='form-control'
									/>
								</div>
								<div className={styles.td}>
									<input
										type='number'
										{...register('painting_time', { onBlur: handleSubmit(onSubmit), valueAsNumber: true })}
										defaultValue={product.painting_time ? product.painting_time : 0}
										className='form-control'
									/>
								</div>
								<div className={styles.td}>
									<input
										type='text'
										{...register('polymer_color', { onBlur: handleSubmit(onSubmit) })}
										defaultValue={product.polymer_color ? product.polymer_color : ''}
										className='form-control'
									/>
								</div>
							</div>

							<div className={styles.tr}>
								<div className={styles.td + ' ' + styles.orange}>Коэффициент сложности</div>
								<div className={styles.td}>
									<input
										type='number'
										{...register('work_complexity', { onBlur: handleSubmit(onSubmit), valueAsNumber: true })}
										defaultValue={product.work_complexity ? product.work_complexity : 0}
										min={1}
										step={0.1}
										className='form-control'
									/>
								</div>
								<div className={styles.td}>
									<input
										type='number'
										{...register('installation_complexity', { onBlur: handleSubmit(onSubmit), valueAsNumber: true })}
										defaultValue={product.installation_complexity ? product.installation_complexity : 0}
										min={1}
										step={0.1}
										className='form-control'
									/>
								</div>
								<div className={styles.td}>
									<input
										type='number'
										{...register('painting_complexity', { onBlur: handleSubmit(onSubmit), valueAsNumber: true })}
										defaultValue={product.painting_complexity ? product.painting_complexity : 0}
										min={1}
										step={0.1}
										className='form-control'
									/>
								</div>
								<div className={styles.td}>
									<Controller
										control={control}
										name={'polymer_options'}
										defaultValue={product.polymer_options}
										render={({ field: { onChange, onBlur, value, ref } }) => (
											<Select
												classNamePrefix='polymer-select'
												closeMenuOnSelect={false}
												isSearchable={false}
												value={options.filter(c => value?.includes(c.value))}
												onChange={val => {
													onChange(val.map(c => c.value))
												}}
												onBlur={handleSubmit(onSubmit)}
												options={options}
												isMulti
												placeholder='Нажми'
											/>
										)}
									/>
								</div>
							</div>

							<div className={styles.tr}>
								<div className={styles.td + ' ' + styles.orange}>Итого</div>
								<div className={styles.td}>{total.work}</div>
								<div className={styles.td}>{total.installation}</div>
								<div className={styles.td}>{total.painting}</div>
								<div className={styles.td}>
									<input
										type='number'
										{...register('polymer_price', { onBlur: handleSubmit(onSubmit), valueAsNumber: true })}
										defaultValue={product.polymer_price ? product.polymer_price : 0}
										className='form-control'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>

			<div className={styles.flex}>
				<div className={styles.group + ' ' + styles.blue}>
					<div className={styles.box}>
						<p className={styles.title}>Материалы</p>
					</div>
					<AddWorkshopMaterial product={product} onCreate={onCreate} openAlert={openAlert} />
				</div>
				<div className={styles.group + ' ' + styles.yellow}>
					<div className={styles.box}>
						<p className={styles.title}>Покупное ТМЦ</p>
					</div>
					<AddWorkshopConsumables product={product} onCreate={onCreate} openAlert={openAlert} />
				</div>
			</div>
		</div>
	)
}
