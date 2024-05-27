import axios from 'axios'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { Metal } from '../../../models'
import styles from './style.module.css'
import { getMetalNameSuffix } from './getMetalNameSuffix'

type FormMetalDetailProps = {
	metal: Metal
	updMetal: () => void
}

export function FormMetalDetail({ metal, updMetal }: FormMetalDetailProps) {
	const metalName = getMetalNameSuffix(metal.material)

	const methods = useForm<Metal>()

	const onSubmit: SubmitHandler<Metal> = async data => {
		await axios.put<Metal>(
			process.env.REACT_APP_BACKEND_API_URL + 'metal/',
			data
		)
		await updMetal()
	}

	return (
		<FormProvider {...methods}>
			<form className={styles.row}>
				<input
					{...methods.register('id')}
					type='hidden'
					defaultValue={metal.id}
				/>
				<input
					{...methods.register('length')}
					type='hidden'
					defaultValue={metal.length}
				/>
				<input
					{...methods.register('material')}
					type='hidden'
					defaultValue={metal.material}
				/>
				<input
					{...methods.register('table_number')}
					type='hidden'
					defaultValue={metal.table_number}
				/>
				<input
					{...methods.register('thickness')}
					type='hidden'
					defaultValue={metal.thickness}
				/>
				<input
					{...methods.register('weight_metal')}
					type='hidden'
					defaultValue={metal.weight_metal}
				/>
				<input
					{...methods.register('width')}
					type='hidden'
					defaultValue={metal.width}
				/>
				<div>
					{metal.thickness_title} {metalName}
				</div>
				<div>{metal.width}</div>
				<div>{metal.length}</div>
				<div>
					<input
						{...methods.register('metal_sheets', {
							onBlur: methods.handleSubmit(onSubmit),
						})}
						defaultValue={
							metal.metal_sheets === null ? 0 : metal.metal_sheets
						}
						type='number'
						step='0.0000001'
						onFocus={e =>
							e.target.addEventListener(
								'wheel',
								function (e) {
									e.preventDefault()
								},
								{ passive: false }
							)
						}
						className='form-control'
					/>
				</div>
			</form>
		</FormProvider>
	)
}
