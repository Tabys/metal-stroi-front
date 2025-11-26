import { useFormContext } from 'react-hook-form'
import { Detail, MetalType } from '../../../../../models'

type SelectProps = {
	detailData: Detail
	selected: any
	name: string
	disabled?: boolean
	onSubmit: () => void
	metals: MetalType[]
}

export function FormSelectRoll({ detailData, selected, name, disabled, onSubmit, metals }: SelectProps) {
	const { register, setValue } = useFormContext()
	const metal = metals.find(metal => metal.abbreviation === detailData.material)
	const arrOptions = metal?.rolling || []
	const arrOptionsText = metal?.rolling?.length === 3 ? ['', 'Прокат', 'Конус'] : ['', 'Прокат']

	const options = arrOptions.map((value, index) => {
		let text: string = ''
		if (arrOptionsText) {
			text = arrOptionsText[index]
		} else {
			text = String(value)
		}
		return (
			<option key={index} value={String(value)}>
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
