import { SubmitHandler, useForm } from 'react-hook-form'
import { TFCData } from '../../../../models'
import styles from './style.module.css'
import apiClient from '../../../../components/apiClient'

type TfcCommentFieldProps = {
	tfcData?: TFCData
	openAlert: (type: string, message?: string) => void
}

export function TfcCommentField({ tfcData, openAlert }: TfcCommentFieldProps) {
	const { register, handleSubmit } = useForm<TFCData>({ defaultValues: { comment: tfcData?.comment } })

	const onSubmit: SubmitHandler<TFCData> = async data => {
		data.id = tfcData?.id
		await apiClient
			.put<TFCData>('tfc-data/', data)
			.then(result => {
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', err.response.data.message)
			})
	}

	return (
		<div className={styles.comment_field_container}>
			<form>
				<textarea
					{...register('comment', { onBlur: handleSubmit(onSubmit) })}
					placeholder='Комментарий'
					className={styles.comment_field + ' form-control'}
				/>
			</form>
		</div>
	)
}
