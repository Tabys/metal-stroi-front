import axios from 'axios'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { Metal } from '../../../models'
import styles from './style.module.css'
import { getMetalNameSuffix } from './getMetalNameSuffix'
import { useEffect } from 'react'
import { FaArrowsRotate } from 'react-icons/fa6'

type FormMetalDetailProps = {
	metal: Metal
	updMetal: () => void
	openAlert: () => void
	openErrorAlert: () => void
	setTextErrorAlert: React.Dispatch<React.SetStateAction<string>>
}

export function FormMetalDetail({ metal, updMetal, openAlert, openErrorAlert, setTextErrorAlert }: FormMetalDetailProps) {
	const metalName = getMetalNameSuffix(metal.material)

	const methods = useForm<Metal>()

	useEffect(() => {
		methods.setValue('metal_sheets', metal.metal_sheets === null ? 0 : metal.metal_sheets)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [metal])

	const onSubmit: SubmitHandler<Metal> = async data => {
		await axios
			.put<Metal>(process.env.REACT_APP_BACKEND_API_URL + 'metal/', data)
			.then(result => {
				openAlert()
			})
			.catch(err => {
				if (err.response.status > 200) {
					methods.setError('root.serverError', {
						type: err.response.status,
						message: err.response.data.message,
					})
					openErrorAlert()
					methods.setValue('metal_sheets', err.response.data.original_sheets)
					setTextErrorAlert(err.response.data.message)
				}
			})
	}

	const onSubmitUpdMetalLists: SubmitHandler<Metal> = async data => {
		await axios.put<Metal>(process.env.REACT_APP_BACKEND_API_URL + 'metal/upd-lists', data)
		openAlert()
		updMetal()
	}

	return (
		<FormProvider {...methods}>
			<form className={styles.row}>
				<input {...methods.register('id')} type='hidden' defaultValue={metal.id} />
				<input {...methods.register('length')} type='hidden' defaultValue={metal.length} />
				<input {...methods.register('material')} type='hidden' defaultValue={metal.material} />
				<input {...methods.register('table_number')} type='hidden' defaultValue={metal.table_number} />
				<input {...methods.register('thickness')} type='hidden' defaultValue={metal.thickness} />
				<input {...methods.register('weight_metal')} type='hidden' defaultValue={metal.weight_metal} />
				<input {...methods.register('width')} type='hidden' defaultValue={metal.width} />
				<div>
					{metal.thickness_title} {metalName} {metal.customer_metal ? 'зак' : ''}
				</div>
				<div>{metal.width}</div>
				<div>{metal.length}</div>
				<div>
					<input
						{...methods.register('metal_sheets', {
							onBlur: methods.handleSubmit(onSubmit),
						})}
						defaultValue={metal.metal_sheets === null ? 0 : metal.metal_sheets}
						type='number'
						step='0.0001'
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
				<div className={styles.updLists}>
					<button className='btn btn-primary' onClick={methods.handleSubmit(onSubmitUpdMetalLists)}>
						<FaArrowsRotate />
					</button>
				</div>
			</form>
		</FormProvider>
	)
}
