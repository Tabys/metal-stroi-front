import { useFormContext } from 'react-hook-form'

type SelectProps = {
	arrOptions: any[]
	arrOptionsText?: any[]
	selected: any
	name: string
	disabled?: boolean
	onSubmit: () => void
}

export function FormSelect({
	arrOptions,
	arrOptionsText,
	selected,
	name,
	disabled,
	onSubmit,
}: SelectProps) {
	const { register, setValue } = useFormContext()

	const options = arrOptions.map((value, index) => {
		let text = ''
		if (arrOptionsText) {
			text = arrOptionsText[index]
		} else {
			text = value
		}
		return (
			<option key={index} value={value}>
				{text}
			</option>
		)
	})

	return (
		<select
			{...register(name)}
			defaultValue={selected}
			onChange={e => {
				setValue(name, e.target.value)
				onSubmit()
			}}
			className='form-select'
			disabled={disabled}
		>
			{options}
		</select>
	)
}
