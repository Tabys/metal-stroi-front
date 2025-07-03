import { SubmitHandler, useForm } from 'react-hook-form'
import { PriceMetalItem } from '../../models'
import { Form } from 'react-bootstrap'
import apiClient from '../../components/apiClient'

type FormCreateNewThicknessProps = {
	categoryId: number
	openAlert: () => void
	refetchPrices: () => void
}

export function FormCreateNewThickness({ categoryId, openAlert, refetchPrices }: FormCreateNewThicknessProps) {
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm<PriceMetalItem>()

	const onSubmit: SubmitHandler<PriceMetalItem> = async data => {
		data.title = data.thickness
		const match = data.thickness.match(/^\d+(\.\d+)?/)

		if (match) {
			data.thickness = match[0]
		}

		data.gas = 'oxygen'
		data.add_cost = 0
		await apiClient
			.post<PriceMetalItem>('price-metal-item', data)
			.then(result => {
				openAlert()
				reset()
				refetchPrices()
			})
			.catch(err => {
				console.log(err.response)
				if (err.response.status > 200) {
					setError('root.serverError', {
						type: err.response.status,
						message: err.response.data.message,
					})
				}
			})
	}

	return (
		<>
			<h3>Добавить толщину</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type='hidden' {...register('price_metal_category_id', { valueAsNumber: true })} value={categoryId} />
				<div className='mb-3'>
					<label className='form-label'>Толщина металла</label>
					<input
						{...register('thickness', {
							required: 'Это поле обязательное',
						})}
						className={errors.thickness ? 'form-control is-invalid' : 'form-control'}
						type='text'
					/>
					{errors.thickness && <Form.Text className='text-danger'>{errors.thickness.message}</Form.Text>}
				</div>
				<div className='mb-3'>
					<label className='form-label'>Номер таблицы</label>
					<input
						{...register('table_name', {
							required: 'Это поле обязательное',
						})}
						className={errors.table_name ? 'form-control is-invalid' : 'form-control'}
						type='text'
					/>
					{errors.table_name && <Form.Text className='text-danger'>{errors.table_name.message}</Form.Text>}
				</div>
				<div className='mb-3'>
					<label className='form-label'>Цена</label>
					<input
						{...register('cost', {
							required: 'Это поле обязательное',
							valueAsNumber: true,
						})}
						className={errors.cost ? 'form-control is-invalid' : 'form-control'}
						type='number'
					/>
					{errors.cost && <Form.Text className='text-danger'>{errors.cost.message}</Form.Text>}
				</div>
				<button type='submit' className='btn btn-primary'>
					Добавить
				</button>
			</form>
		</>
	)
}
