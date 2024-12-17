import { useFormContext } from 'react-hook-form'
import { Detail } from '../../../../models'
import styles from '../style.module.css'

type RadioProps = {
	name: string
	defaultValue: string
	data: Detail
	onSubmit: () => void
}

export function FormRadio({ name, defaultValue, data, onSubmit }: RadioProps) {
	const { register, setValue } = useFormContext()

	return (
		<>
			<div className={styles.line + ' ' + styles.green + ' ' + styles.radio}>
				<input
					{...register(name)}
					onChange={e => {
						setValue(name, e.target.value ? 'laser' : 'plasma')
						onSubmit()
					}}
					disabled={Number(data.thickness) > 20 || data.custom === true ? true : false}
					type='radio'
					defaultValue='laser'
					defaultChecked={defaultValue === 'laser' ? true : false}
					className='form-check-input'
				/>
			</div>
			<div className={styles.line + ' ' + styles.green + ' ' + styles.radio}>
				<input
					{...register(name)}
					onChange={e => {
						setValue(name, e.target.value ? 'plasma' : 'laser')
						onSubmit()
					}}
					disabled={Number(data.thickness) < 4 || data.custom === true ? true : false}
					type='radio'
					defaultValue='plasma'
					defaultChecked={defaultValue === 'plasma' ? true : false}
					className='form-check-input'
				/>
			</div>
		</>
	)
}
