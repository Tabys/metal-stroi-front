import { SubmitHandler, useForm } from 'react-hook-form'
import { WorkshopData } from '../../../../models'
import styles from '../workshopsTable/style.module.css'
import apiClient from '../../../../components/apiClient'

type WorkshopCommentFieldProps = {
	workshopData?: WorkshopData
	openAlert: (type: string, message?: string) => void
}

export function WorkshopCommentField({ workshopData, openAlert }: WorkshopCommentFieldProps) {
	const { register, handleSubmit } = useForm<WorkshopData>({ defaultValues: { comment: workshopData?.comment } })

	const onSubmit: SubmitHandler<WorkshopData> = async data => {
		data.id = workshopData?.id
		await apiClient
			.put<WorkshopData>('workshops-data/', data)
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
