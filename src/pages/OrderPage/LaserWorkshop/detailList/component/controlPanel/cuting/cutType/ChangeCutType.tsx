import styles from '../../../../style.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ChangeCutTypeForm } from '../../../../../../../../models'
import apiClient from '../../../../../../../../components/apiClient'

type ChangeCutTypeProps = {
	orderId: number
	update: () => void
	openAlert: (type: string, massage?: string) => void
}

export function ChangeCutType({ orderId, update, openAlert }: ChangeCutTypeProps) {
	const { handleSubmit, register, setValue } = useForm<ChangeCutTypeForm>()

	const onSubmit: SubmitHandler<ChangeCutTypeForm> = async data => {
		data.id = orderId
		await apiClient
			.put<ChangeCutTypeForm>('detail/cut-types', data)
			.then(result => {
				openAlert('success', 'Изменения сохранены')
				update()
			})
			.catch(err => {
				if (err.response.status > 200) {
					openAlert('danger', err.response.data.message)
				}
			})
	}

	const handleRadioChange = (value: 'laser' | 'plasma') => {
		setValue('cut_type', value)
		handleSubmit(onSubmit)()
	}

	return (
		<>
			<div className={styles.line + ' ' + styles.green}>
				<input {...register('cut_type')} onChange={() => handleRadioChange('laser')} type='radio' defaultValue='laser' className='form-check-input' />
			</div>
			<div className={styles.line + ' ' + styles.green}>
				<input {...register('cut_type')} onChange={() => handleRadioChange('plasma')} type='radio' defaultValue='plasma' className='form-check-input' />
			</div>
		</>
	)
}
