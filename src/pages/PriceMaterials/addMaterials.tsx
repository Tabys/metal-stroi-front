import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { AddMetalType, MetalType } from '../../models'
import Select from 'react-select'
import { Form, Spinner } from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable'
import apiClient from '../../components/apiClient'
import { useState } from 'react'

type AddMaterialsProps = {
	refetchPrices: () => void
	openAlert: (type: string, message?: string) => void
	pricesCategories: MetalType[]
}

export function AddMaterials({ refetchPrices, openAlert, pricesCategories }: AddMaterialsProps) {
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<AddMetalType>()

	const MetalTypeOptions = [
		{ value: 'Черный', label: 'Черный металл' },
		{ value: 'Нерж', label: 'Нержавеющий металл' },
		{ value: 'Алюм', label: 'Алюминий' },
	]

	const RollingOptions = [
		{ value: '["","rolling_roll"]', label: 'Прокат' },
		{ value: '["","rolling_cone"]', label: 'Конус' },
		{ value: '["","rolling_roll","rolling_cone"]', label: 'Прокат и Конус' },
	]

	const Options: { value: string; label: string }[] = Array.from(
		new Set(pricesCategories.flatMap(category => category.options ?? []).map(option => String(option)))
	).map(option => ({ value: option, label: option }))

	const lastSort = pricesCategories.length > 0 ? pricesCategories[pricesCategories.length - 1].sort : 0

	const onSubmit: SubmitHandler<AddMetalType> = async data => {
		data.sort = Number(lastSort) + 1
		setIsLoading(true)
		await apiClient
			.post<AddMetalType>('price-metal-category', data)
			.then(result => {
				openAlert('success', 'Изменения сохранены')
				refetchPrices()
				setIsLoading(false)
			})
			.catch(error => {
				openAlert('danger', error.response.data.message)
				setIsLoading(false)
			})
	}

	return (
		<>
			<h3>Добавить материал</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='form-group mb-3'>
					<label htmlFor='name'>Название (как будет отображаться в списке меню)</label>
					<input type='text' className='form-control' id='name' {...register('name', { required: 'Это поле обязательное' })} />
					{errors.name && <Form.Text className='text-danger'>{errors.name.message}</Form.Text>}
				</div>

				<div className='form-group mb-3'>
					<label htmlFor='abbreviation'>Аббревиатура</label>
					<input type='text' className='form-control' id='abbreviation' {...register('abbreviation', { required: 'Это поле обязательное' })} />
					{errors.abbreviation && <Form.Text className='text-danger'>{errors.abbreviation.message}</Form.Text>}
				</div>

				<div className='form-group mb-3'>
					<label htmlFor='short_name'>Сокращенное название (Ст3, Ст3х/к, нерж пищ зерк ...)</label>
					<input type='text' className='form-control' id='short_name' {...register('short_name', { required: 'Это поле обязательное' })} />
					{errors.short_name && <Form.Text className='text-danger'>{errors.short_name.message}</Form.Text>}
				</div>

				<div className='form-group mb-3'>
					<label htmlFor='short_name_for_metal'>Сокращенное название для толщины металла (, риф ,х/к, нерж пищ зерк ...)</label>
					<input
						type='text'
						className='form-control'
						id='short_name_for_metal'
						{...register('short_name_for_metal', { required: 'Это поле обязательное' })}
					/>
					{errors.short_name_for_metal && <Form.Text className='text-danger'>{errors.short_name_for_metal.message}</Form.Text>}
				</div>

				<div className='form-group mb-3'>
					<label htmlFor='density'>Плотность (почти у всех = 8)</label>
					<input type='number' className='form-control' id='density' {...register('density', { required: 'Это поле обязательное' })} />
					{errors.density && <Form.Text className='text-danger'>{errors.density.message}</Form.Text>}
				</div>

				<div className='form-group mb-3'>
					<label htmlFor='metal_type'>Тип металла</label>
					<Controller
						control={control}
						name={'metal_type'}
						rules={{ required: 'Это поле обязательное' }}
						render={({ field: { onChange, value, ref, ...field } }) => (
							<Select
								{...field}
								isSearchable={true}
								ref={ref}
								value={MetalTypeOptions.find(option => option.value === value) ?? null}
								onChange={val => onChange(val ? (val as { value: string }).value : '')}
								isDisabled={MetalTypeOptions.length === 0}
								options={MetalTypeOptions}
								placeholder='Нажми'
							/>
						)}
					/>
					{errors.metal_type && <Form.Text className='text-danger'>{errors.metal_type.message}</Form.Text>}
				</div>

				<div className='form-group mb-3'>
					<label htmlFor='rolling'>Виды вальцовки (Прокат, Конус)</label>
					<Controller
						control={control}
						name={'rolling'}
						rules={{ required: 'Это поле обязательное' }}
						render={({ field: { onChange, value, ref, ...field } }) => {
							const selectedOption = value ? RollingOptions.find(option => option.value === JSON.stringify(value)) : null
							return (
								<Select
									{...field}
									isSearchable={true}
									ref={ref}
									value={selectedOption ?? null}
									onChange={val => onChange(val ? JSON.parse((val as { value: string }).value) : [])}
									isDisabled={RollingOptions.length === 0}
									options={RollingOptions}
									placeholder='Нажми'
								/>
							)
						}}
					/>
					{errors.rolling && <Form.Text className='text-danger'>{errors.rolling.message}</Form.Text>}
				</div>

				<div className='form-group mb-3'>
					<label htmlFor='options'>Опции (отображаются уже существующие опции, но если начать печатать, то можно добавить новую)</label>
					<Controller
						control={control}
						name={'options'}
						render={({ field: { onChange, value, ref, ...field } }) => {
							return (
								<CreatableSelect
									{...field}
									isSearchable={true}
									ref={ref}
									value={value && Array.isArray(value) ? value.map((v: string) => ({ value: v, label: v })) : []}
									onChange={val => onChange(val ? (val as unknown as { value: string }[]).map(c => c.value) : [])}
									options={Options}
									isMulti
									placeholder='Нажми'
								/>
							)
						}}
					/>
					{errors.options && <Form.Text className='text-danger'>{errors.options.message}</Form.Text>}
				</div>

				<button type='submit' className='btn btn-primary mb-5' disabled={isLoading}>
					{isLoading ? <Spinner animation='border' size='sm' /> : 'Добавить'}
				</button>
			</form>
		</>
	)
}
