import { AxiosError } from 'axios'
import { AddSuffix, FormatedSetupsData, MetalType, Order } from '../../../../models'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { SetupList } from './SetupList'
import style from './style.module.css'
import { dubleDetails } from './findDublDetails'
import apiClient from '../../../../components/apiClient'
import { Form, Spinner } from 'react-bootstrap'

type AddSuffixAndMetalsProps = {
	onCreate: () => void
	onClose: () => void
	order: Order
}

export function AddSuffixesAndMetals({ onCreate, onClose, order }: AddSuffixAndMetalsProps) {
	const {
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<AddSuffix>()
	const [arrDubleDetails, setArrDubleDetails] = useState<number[]>([])
	const [dataSetups, setDataSetups] = useState<FormatedSetupsData[]>([])
	const [arrSuffix, setArrSuffix] = useState<AddSuffix[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [metals, setMetals] = useState<MetalType[] | null>(null)

	async function getOrder() {
		try {
			const dataMetals = await apiClient.get<MetalType[]>('price-metal-category')
			setMetals(dataMetals.data)
		} catch (e: unknown) {
			const error = e as AxiosError
			console.log({ error })
		}
	}

	useEffect(() => {
		getOrder()
		setArrDubleDetails(dubleDetails(order))
		let formatedDataSetups: FormatedSetupsData[] = []
		order.metals?.forEach(metal => {
			formatedDataSetups.push({
				id: metal.id,
				thickness: metal.thickness,
				table_number: metal.table_number,
				metals: metal.material,
				setups: [],
			})
		})
		formatedDataSetups.forEach(item => {
			const setups = order.setups?.filter(setup => {
				return setup.table_number === item.table_number
			})
			item.setups = setups
		})
		setDataSetups(formatedDataSetups)

		let initialData = order.setups?.map(setup => {
			return {
				id: Number(setup.id),
				order_id: Number(setup.order_id),
				thickness: Number(setup?.work_piece?.split(' x ')[2]),
				table_number: setup?.table_number ? setup?.table_number : '',
				material: setup?.material ? setup?.material : '',
				metals: null,
				azote: setup.azote,
				suffixes: setup.suffixes,
			}
		})
		setArrSuffix(initialData ? initialData : [])
	}, [order])

	dataSetups?.sort((a, b) => (a.thickness > b.thickness ? 1 : -1))

	const onSubmit: SubmitHandler<AddSuffix> = async data => {
		setIsLoading(true)
		await apiClient
			.put<AddSuffix>('setup/suffixes', arrSuffix)
			.then(() => {
				onClose()
				onCreate()
				setIsLoading(false)
			})
			.catch(error => {
				console.log(error.response)
				setIsLoading(false)
				if (error.response.status > 200) {
					setError('root.serverError', {
						type: error.response.status,
						message: error.response.data.message,
					})
				}
			})
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={style.suffix_form}>
				{dataSetups.map(data => (
					<SetupList
						key={data.id}
						metals={metals}
						data={data}
						order={order}
						setArrSuffix={setArrSuffix}
						arrSuffix={arrSuffix}
						dubleDetails={arrDubleDetails}
					/>
				))}
			</div>
			<button type='submit' className='btn btn-primary container-fluid' disabled={isLoading}>
				{isLoading ? <Spinner /> : 'Сохранить'}
			</button>
			{errors.root?.serverError.type === 400 && <Form.Text className='text-danger'>{errors?.root?.serverError.message}</Form.Text>}
		</form>
	)
}
