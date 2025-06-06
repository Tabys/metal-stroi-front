import { Form, Spinner } from 'react-bootstrap'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { AddSetupsBending } from '../../../../models'
import { useMaterialPrices } from '../../../../hooks/priceMaterials'
import { useState } from 'react'
import { listMetalName } from '../detailList/listMetalName'
import Select from 'react-select'
import style from './style.module.css'
import apiClient from '../../../../components/apiClient'

type addSetupBendingProps = {
	onCreate: () => void
	onClose: () => void
	order_id?: number
}

export function AddSetupBending({ onCreate, onClose, order_id }: addSetupBendingProps) {
	const [isLoading, setIsLoading] = useState(false)

	const { prices } = useMaterialPrices()
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<AddSetupsBending>()

	const [material, setMaterial] = useState<string>('St37')

	const arrOptions: any[] = listMetalName(material)
	let avalibleMetals = prices.find(price => price.abbreviation === material)
	let groupAvalibleMetal = avalibleMetals?.price_metal_items?.filter((obj, idx, arr) => idx === arr.findIndex(t => t.title === obj.title))

	const options = arrOptions.map(value => {
		return { value: value, label: value }
	})

	const onSubmit: SubmitHandler<AddSetupsBending> = async data => {
		setIsLoading(true)
		const detailsArray = data.detailsNames?.split('\n')
		const detailsData: any[] = []

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

		detailsArray?.forEach(detail => {
			const fileName = detail.includes('.') ? detail.substring(0, detail.lastIndexOf('.')) : detail
			const fileNameWithoutExtension = fileName.includes('&') ? fileName.split('&')[0] : fileName

			detailsData.push({
				name: fileNameWithoutExtension,
				thickness: Number(realTickness?.thickness),
				cut_type: '',
				table_number: realTickness?.table_name,
				metal_cost: realTickness?.cost,
				setup_detail: { count: detail.split('&')[1] ? (isNaN(Number(detail.split('&')[1])) ? 1 : Number(detail.split('&')[1])) : 1 },
			})
		})
		data.details = detailsData
		await apiClient
			.post<AddSetupsBending>('setup/bending', data)
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
				<div className='mb-2'></div>
				<div className={style.flex + ' mb-2'}>
					<label className='form-label'>Материал:</label>
					<div className={style.wrapp}>
						<div className={style.group}>
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
				<textarea
					{...register('detailsNames', {
						required: 'Это поле обязательное',
					})}
					className={errors.detailsNames ? 'form-control is-invalid' : 'form-control'}
				></textarea>
				{errors.detailsNames && <Form.Text className='text-danger'>{errors.detailsNames.message}</Form.Text>}
			</div>

			<button type='submit' className='btn btn-primary container-fluid' disabled={isLoading}>
				{isLoading ? <Spinner /> : 'Создать'}
			</button>
		</form>
	)
}
