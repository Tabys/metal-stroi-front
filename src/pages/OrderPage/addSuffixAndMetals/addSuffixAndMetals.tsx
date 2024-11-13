import axios, { AxiosError } from 'axios'
import { AddSuffix, FormatedSetupsData, MetalType, Order } from '../../../models'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { SetupList } from './SetupList'
import style from './style.module.css'
import { dubleDetails } from './findDublDetails'

type AddSuffixAndMetalsProps = {
	onCreate: () => void
	onClose: () => void
	order: Order
}

export function AddSuffixesAndMetals({ onCreate, onClose, order }: AddSuffixAndMetalsProps) {
	const { handleSubmit } = useForm<AddSuffix>()
	const [arrDubleDetails, setArrDubleDetails] = useState<number[]>([])
	const [dataSetups, setDataSetups] = useState<FormatedSetupsData[]>([])
	const [arrSuffix, setArrSuffix] = useState<AddSuffix[]>([])

	const [metals, setMetals] = useState<MetalType[] | null>(null)

	async function getOrder() {
		try {
			const dataMetals = await axios.get<MetalType[]>(process.env.REACT_APP_BACKEND_API_URL + 'price-metal-category')
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
				customer_metal: metal.customer_metal,
				setups: [],
			})
		})
		formatedDataSetups.forEach(item => {
			const setups = order.setups?.filter(setup => {
				return setup.table_number === item.table_number && setup.customers_metal === item.customer_metal
			})
			item.setups = setups
		})
		setDataSetups(formatedDataSetups)

		let initialData = order.setups?.map(setup => {
			return {
				id: Number(setup.id),
				order_id: Number(setup.order_id),
				thickness: Number(setup?.work_piece?.split(' x ')[2]),
				material: setup?.material ? setup?.material : '',
				customers_metal: setup.customers_metal,
				metals: null,
				azote: setup.azote,
				suffixes: setup.suffixes,
			}
		})
		setArrSuffix(initialData ? initialData : [])
	}, [order])

	dataSetups?.sort((a, b) => (a.thickness > b.thickness ? 1 : -1))
	console.log(dataSetups)

	const onSubmit: SubmitHandler<AddSuffix> = async data => {
		// console.log(arrSuffix)
		await axios.put<AddSuffix>(process.env.REACT_APP_BACKEND_API_URL + 'setup/suffixes', arrSuffix)
		onClose()
		setTimeout(() => {
			onCreate()
		}, 300)
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={style.suffix_form}>
				{dataSetups.map(data => (
					<SetupList key={data.id} metals={metals} data={data} setArrSuffix={setArrSuffix} arrSuffix={arrSuffix} dubleDetails={arrDubleDetails} />
				))}
			</div>
			<button type='submit' className='btn btn-primary container-fluid'>
				Сохранить
			</button>
		</form>
	)
}
