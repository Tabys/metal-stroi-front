import { SubmitHandler, useForm } from 'react-hook-form'
import apiClient from '../../../../components/apiClient'

type UniversalChangeProps = {
	orderId: number
	name: string
	update: () => void
	openAlert: (type: string, massage?: string) => void
}

type UniversalChangeForm = {
	id: number
	value: number
}

export function UniversalChange({ orderId, name, update, openAlert }: UniversalChangeProps) {
	const { handleSubmit, register } = useForm<UniversalChangeForm>()

	const onSubmit: SubmitHandler<UniversalChangeForm> = async data => {
		data.id = orderId
		await apiClient
			.put<UniversalChangeForm>('tfc-details/universal', {
				id: orderId,
				value: data.value,
				name: name,
			})
			.then(result => {
				update()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				if (err.response.status > 200) {
					openAlert('danger', err.response.data.message)
				}
			})
	}

	return (
		<>
			<input
				{...register('value', {
					onBlur: handleSubmit(onSubmit),
					valueAsNumber: true,
				})}
				className='form-control'
			/>
		</>
	)
}
