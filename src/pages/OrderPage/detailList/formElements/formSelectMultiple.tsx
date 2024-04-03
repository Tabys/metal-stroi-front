import { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import Select from 'react-select'

type SelectProps = {
	arrOptions: any[]
	arrOptionsText?: any[]
	selected: any
	name: string
	user_role?: string
	onSubmit: () => void
}

export function FormSelectMultiple({
	arrOptions,
	arrOptionsText,
	selected,
	name,
	user_role,
	onSubmit,
}: SelectProps) {
	const { register, control } = useFormContext()
	const [value, setValue] = useState()

	const options = arrOptions.map((value, index) => {
		let text = ''
		if (arrOptionsText) {
			text = arrOptionsText[index]
		} else {
			text = value
		}
		return { value: value, label: text }
	})

	const handleChange = (changeValue: any) => {
		setValue(changeValue)
	}

	return (
		<>
			<Controller
				control={control}
				defaultValue={selected}
				name={name}
				render={({ field: { onChange, value, ref } }) => (
					<Select
						closeMenuOnSelect={false}
						isSearchable={false}
						value={options.filter(c => value.includes(c.value))}
						onChange={val => onChange(val.map(c => c.value))}
						onBlur={onSubmit}
						options={options}
						isMulti
						className='multi_select_container'
						classNamePrefix='multi_select'
						placeholder='Нажми'
					/>
				)}
			/>
		</>
	)
}
