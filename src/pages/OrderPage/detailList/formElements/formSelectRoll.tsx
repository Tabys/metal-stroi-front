import { useFormContext } from 'react-hook-form'
import { Detail } from '../../../../models'

type SelectProps = {
	detailData: Detail
	selected: any
	name: string
	disabled?: boolean
	onSubmit: () => void
}

export function FormSelectRoll({ detailData, selected, name, disabled, onSubmit }: SelectProps) {
	const { register, setValue } = useFormContext()
	let arrOptions: string[] = []
	let arrOptionsText: string[] = []
	switch (detailData.material) {
		case 'St37':
		case '09Г2С':
			arrOptions = ['', 'rolling_roll', 'rolling_cone']
			arrOptionsText = ['', 'Прокат', 'Конус']
			break
		case 'AlMg3':
		case 'ОЦ':
		case '1.4301':
		case 'aisi430':
			arrOptions = ['', 'rolling_roll']
			arrOptionsText = ['', 'Прокат']
			break
	}

	const options = arrOptions.map((value, index) => {
		let text: string = ''
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
