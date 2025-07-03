import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { Material, Metal, WorkPiece } from '../../../../models'
import styles from './style.module.css'
import { getMetalNameSuffix } from './getMetalNameSuffix'
import { useEffect } from 'react'
import apiClient from '../../../../components/apiClient'
import { FaCircleNotch } from 'react-icons/fa6'
import { extraPrice } from '../detailList/updPrices/extraPriceMetal'

type FormMetalDetailProps = {
	workPiece: WorkPiece[]
	metal: Metal
	updMetal: () => void
	openAlert: () => void
	openErrorAlert: () => void
	setTextErrorAlert: React.Dispatch<React.SetStateAction<string>>
	materials: Material[]
	markup: number
}

export function FormMetalDetail({ workPiece, metal, updMetal, openAlert, openErrorAlert, setTextErrorAlert, materials, markup }: FormMetalDetailProps) {
	const metalName = getMetalNameSuffix(metal.material)

	const methods = useForm<Metal>()

	useEffect(() => {
		methods.setValue('metal_sheets', metal.metal_sheets === null ? 0 : metal.metal_sheets)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [metal])

	const onSubmit: SubmitHandler<Metal> = async data => {
		data.id = metal.id
		data.length = metal.length
		data.material = metal.material
		data.table_number = metal.table_number
		data.thickness = metal.thickness
		data.weight_metal = metal.weight_metal
		data.width = metal.width

		await apiClient
			.put<Metal>('metal/', data)
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
		data.id = metal.id
		data.length = metal.length
		data.material = metal.material
		data.table_number = metal.table_number
		data.thickness = metal.thickness
		data.weight_metal = metal.weight_metal
		data.width = metal.width

		await apiClient.put<Metal>('metal/upd-lists', data)
		openAlert()
		updMetal()
	}

	const onSubmitRoundSheets: SubmitHandler<Metal> = async data => {
		data.id = metal.id
		data.length = metal.length
		data.material = metal.material
		data.table_number = metal.table_number
		data.thickness = metal.thickness
		data.weight_metal = metal.weight_metal
		data.width = metal.width

		await apiClient.put<Metal>('metal/round-sheets', data)
		openAlert()
		updMetal()
	}

	const rate = workPiece.find(
		item =>
			item.material === metal.material && Number(metal.thickness) >= Number(item.thickness_min) && Number(metal.thickness) <= Number(item.thickness_max)
	)

	return (
		<FormProvider {...methods}>
			<form className={styles.row}>
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
				<div>
					{!metal.customer_metal
						? (
								(((Number(materials.find(material => material.table_name === metal.table_number)?.cost) *
									(metal.setup_width * metal.setup_length)) /
									Number(rate?.surface ?? 1)) *
									(1 + Number(markup) / 100) +
									extraPrice(markup)) *
								Number(metal.metal_sheets)
						  ).toFixed(2)
						: 0}
				</div>

				<div className={styles.updLists}>
					<button className='btn btn-primary' onClick={methods.handleSubmit(onSubmitUpdMetalLists)}>
						<i className='fi fi-sr-refresh'></i>
					</button>
				</div>
				<div className={styles.updLists}>
					<button className='btn btn-primary' onClick={methods.handleSubmit(onSubmitRoundSheets)}>
						<FaCircleNotch />
					</button>
				</div>
			</form>
		</FormProvider>
	)
}
