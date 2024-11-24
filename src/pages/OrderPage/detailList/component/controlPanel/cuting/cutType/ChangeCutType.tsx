import axios from 'axios'
import styles from '../../../../style.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ChangeCutTypeForm } from '../../../../../../../models'

type ChangeCutTypeProps = {
	orderId: number
	update: () => void
	openAlert: (type: string, massage?: string) => void
}

export function ChangeCutType({ orderId, update, openAlert }: ChangeCutTypeProps) {
	const {
		handleSubmit,
		setError,
		register,
		setValue,
		formState: { errors },
	} = useForm<ChangeCutTypeForm>()

	const onSubmit: SubmitHandler<ChangeCutTypeForm> = async data => {
		data.id = orderId
		await axios
			.put<ChangeCutTypeForm>(process.env.REACT_APP_BACKEND_API_URL + 'detail/cut-types', data)
			.then(result => {
				openAlert('success', 'Изменения сохранены')
				update()
			})
			.catch(err => {
				if (err.response.status > 200) {
					setError('root.serverError', {
						type: err.response.status,
						message: err.response.data.message,
					})
					openAlert('danger', errors?.root?.serverError.message)
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
