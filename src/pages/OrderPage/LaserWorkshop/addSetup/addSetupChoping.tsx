import { Form, Spinner } from 'react-bootstrap'
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form'
import { AddSetupsChoping } from '../../../../models'
import { useMaterialPrices } from '../../../../hooks/priceMaterials'
import { useState } from 'react'
import { listMetalName } from '../detailList/listMetalName'
import Select from 'react-select'
import style from './style.module.css'
import { FaMinus, FaPlus, FaRegTrashCan } from 'react-icons/fa6'
import apiClient from '../../../../components/apiClient'

type addSetupChopingProps = {
	onCreate: () => void
	onClose: () => void
	order_id?: number
}

export function AddSetupChoping({ onCreate, onClose, order_id }: addSetupChopingProps) {
	const [isLoading, setIsLoading] = useState(false)

	const { prices } = useMaterialPrices()
	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AddSetupsChoping>()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'details',
	})

	const [material, setMaterial] = useState<string>('St37')

	const arrOptions: any[] = listMetalName(material)
	let avalibleMetals = prices.find(price => price.abbreviation === material)
	let groupAvalibleMetal = avalibleMetals?.price_metal_items?.filter((obj, idx, arr) => idx === arr.findIndex(t => t.title === obj.title))

	const options = arrOptions.map(value => {
		return { value: value, label: value }
	})

	const onSubmit: SubmitHandler<AddSetupsChoping> = async data => {
		setIsLoading(true)
		if (data.suffixes) {
			const jsonList: any[] = []
			data.suffixes.forEach(suffix => {
				jsonList.push({
					value: suffix,
					label: suffix,
				})
			})
			data.suffixes = jsonList
		}
		let realTickness = groupAvalibleMetal?.find(metal => metal.title === data.thicknessTitle)
		data.thickness = Number(realTickness?.thickness)

		data.details?.forEach(detail => {
			detail.thickness = Number(realTickness?.thickness)
			detail.table_number = realTickness?.table_name
			detail.cut_type = ''
			detail.metal_cost = realTickness?.cost
			detail.setup_detail = {
				count: detail.quantity,
			}
			delete detail.quantity
		})
		await apiClient
			.post<AddSetupsChoping>('setup/choping', data)
			.then(() => {
				setIsLoading(false)
				onCreate()
				onClose()
			})
			.catch(() => {
				setIsLoading(false)
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={style.setup}>
				<input {...register('order_id')} type='hidden' defaultValue={order_id} />
				<div className='mb-2'>
					<label className='form-label'>Материал</label>
					<select
						{...register('material', {
							required: 'Это поле обязательное',
						})}
						onChange={e => {
							setMaterial(e.target.value)
						}}
						className={errors.material ? 'form-select is-invalid' : 'form-select'}
						defaultValue={''}
					>
						<option disabled value={''}>
							выбери
						</option>
						{prices.map(item => (
							<option key={item.id} value={item.abbreviation}>
								{item.name} ({item.abbreviation})
							</option>
						))}
					</select>
					{errors.material && <Form.Text className='text-danger'>{errors.material.message}</Form.Text>}
				</div>
				<div className={style.flex + ' mb-2'}>
					<label className='form-label'>Заготовка:</label>
					<div className={style.wrapp}>
						<div className={style.group}>
							<input
								type='number'
								{...register('length', {
									required: 'Это поле обязательное',
								})}
								placeholder='Длина'
								className={errors.length ? 'form-control is-invalid' : 'form-control'}
							/>
							{errors.length && <Form.Text className='text-danger'>{errors.length.message}</Form.Text>}
						</div>
						<div className={style.group}>
							<input
								type='number'
								{...register('width', {
									required: 'Это поле обязательное',
								})}
								placeholder='Ширина'
								className={errors.width ? 'form-control is-invalid' : 'form-control'}
							/>
							{errors.width && <Form.Text className='text-danger'>{errors.width.message}</Form.Text>}
						</div>
						<div className={style.group}>
							<select
								{...register('thicknessTitle', {
									required: 'Это поле обязательное',
								})}
								className={errors.thicknessTitle ? 'form-select is-invalid' : 'form-select'}
								defaultValue={''}
							>
								<option value='' disabled>
									Толщина
								</option>
								{groupAvalibleMetal?.map(metal => {
									return (
										<option key={metal.id} value={metal.title}>
											{metal.title}
										</option>
									)
								})}
							</select>
							{errors.thicknessTitle && <Form.Text className='text-danger'>{errors.thicknessTitle.message}</Form.Text>}
						</div>
					</div>
				</div>
				<div className='mb-2'>
					<label className='form-label'>Суффиксы</label>
					<Controller
						control={control}
						name={'suffixes'}
						render={({ field: { onChange, value, ref } }) => (
							<Select
								closeMenuOnSelect={false}
								isSearchable={false}
								value={options.filter(c => value?.includes(c.value))}
								onChange={val => onChange(val.map(c => c.value))}
								isDisabled={options.length > 0 ? false : true}
								options={options}
								isMulti
								placeholder='Нажми'
							/>
						)}
					/>
				</div>
			</div>

			<div className={style.details}>
				<p className={style.title}>Детали:</p>
				{fields.map((item, index) => {
					return (
						<div key={item.id} className={style.detail}>
							<div className='mb-2'>
								<label className='form-label'>Название детали</label>
								<input
									{...register(`details.${index}.name`, {
										required: true,
									})}
									className={errors.details?.[index]?.name ? 'form-control is-invalid' : 'form-control'}
								/>
								{errors.details?.[index]?.name && <Form.Text className='text-danger'>Это поле обязательное</Form.Text>}
							</div>
							<div className='mb-2'>
								<label className='form-label'>Колличество</label>
								<input
									{...register(`details.${index}.quantity`, {
										required: true,
										valueAsNumber: true,
									})}
									type='number'
									min={1}
									className={errors.details?.[index]?.quantity ? 'form-control is-invalid' : 'form-control'}
								/>
								{errors.details?.[index]?.quantity && <Form.Text className='text-danger'>Это поле обязательное</Form.Text>}
							</div>
							<div className={style.flex + ' mb-2'}>
								<div className={style.wrapp}>
									<div className={style.group}>
										<label className='form-label'>Длина</label>
										<input
											{...register(`details.${index}.l_size`, {
												required: true,
												valueAsNumber: true,
											})}
											type='number'
											step={0.01}
											min={0}
											className={errors.details?.[index]?.l_size ? 'form-control is-invalid' : 'form-control'}
										/>
										{errors.details?.[index]?.l_size && <Form.Text className='text-danger'>Заполни</Form.Text>}
									</div>
									<div className={style.group}>
										<label className='form-label'>Ширина</label>
										<input
											{...register(`details.${index}.w_size`, {
												required: true,
												valueAsNumber: true,
											})}
											step={0.01}
											min={0}
											type='number'
											className={errors.details?.[index]?.w_size ? 'form-control is-invalid' : 'form-control'}
										/>
										{errors.details?.[index]?.w_size && <Form.Text className='text-danger'>Заполни</Form.Text>}
									</div>
								</div>
							</div>

							<button type='button' onClick={() => remove(index)} className='btn btn-primary'>
								<FaMinus />
							</button>
						</div>
					)
				})}
			</div>

			<section className={style.interface}>
				<button
					type='button'
					onClick={() => {
						append({
							name: '',
							quantity: 1,
							l_size: undefined,
							w_size: undefined,
						})
					}}
					className={style.detail_btn + ' btn btn-primary'}
				>
					<FaPlus />
				</button>
				<button
					type='button'
					onClick={() =>
						reset({
							details: [],
						})
					}
					className={style.detail_btn + ' btn btn-primary'}
				>
					<FaRegTrashCan />
				</button>
			</section>
			<button type='submit' className='btn btn-primary container-fluid' disabled={isLoading}>
				{isLoading ? <Spinner /> : 'Создать'}
			</button>
		</form>
	)
}
