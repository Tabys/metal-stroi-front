import { SubmitHandler, useForm } from 'react-hook-form'

type Search = {
	name: string
}

export function SearchOrder() {
	const { register, handleSubmit } = useForm<Search>()

	const onSubmit: SubmitHandler<Search> = data => {
		function submit() {
			return data
		}
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='mb-3'>
				<label className='form-label'>Поиск:</label>
				<input
					{...register('name', { onChange: handleSubmit(onSubmit) })}
					className='form-control'
				/>
			</div>
		</form>
	)
}
