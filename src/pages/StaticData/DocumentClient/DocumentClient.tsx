import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import apiClient from '../../../components/apiClient'

type DocumentClientProps = {
	openAlert: (type: string, massage?: string) => void
	staticData: JSON
}

type DocumentClientFormProps = {
	adress: string
	phone: string
	email: string
	storage_conditions: string
}

export function DocumentClient({ openAlert, staticData }: DocumentClientProps) {
	const { register, handleSubmit, reset } = useForm<DocumentClientFormProps>({
		defaultValues: staticData as unknown as DocumentClientFormProps,
	})

	useEffect(() => {
		if (staticData) {
			reset(staticData as unknown as DocumentClientFormProps)
		}
	}, [staticData, reset])

	const onSubmit: SubmitHandler<DocumentClientFormProps> = data => {
		apiClient
			.put('static-data', { category: 'blanc_client', columns: data })
			.then(result => {
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='mb-3'>
				<label htmlFor='client_address' className='form-label'>
					Адрес:
				</label>
				<input type='text' id='client_address' className='form-control' {...register('adress')} />
			</div>
			<div className='mb-3'>
				<label htmlFor='client_phone' className='form-label'>
					Телефон:
				</label>
				<input type='text' id='client_phone' className='form-control' {...register('phone')} />
			</div>
			<div className='mb-3'>
				<label htmlFor='client_email' className='form-label'>
					Email:
				</label>
				<input type='text' id='client_email' className='form-control' {...register('email')} />
			</div>
			<div className='mb-3'>
				<label htmlFor='client_storage_conditions' className='form-label'>
					Условия хранения давальческого сырья:
				</label>
				<textarea id='client_storage_conditions' className='form-control' {...register('storage_conditions')}></textarea>
			</div>
			<button type='submit' className='btn btn-primary'>
				Сохранить
			</button>
		</form>
	)
}
