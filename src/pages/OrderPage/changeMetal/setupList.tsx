import axios, { AxiosError } from 'axios'
import { MetalType, Order } from '../../../models'
import { OneSetup } from './oneSetup'
import style from './style.module.css'
import { useEffect, useState } from 'react'

type SetupListProp = {
	onChange: () => void
	openAlert: () => void
	order: Order
}

export function SetupList({ onChange, openAlert, order }: SetupListProp) {
	const [metals, setMetals] = useState<MetalType[] | null>(null)

	order.setups?.sort((a, b) => (a.id > b.id ? 1 : -1))

	async function getOrder() {
		try {
			const dataMetals = await axios.get<MetalType[]>(
				process.env.REACT_APP_BACKEND_API_URL + 'price-metal-category'
			)
			await setMetals(dataMetals.data)
		} catch (e: unknown) {
			const error = e as AxiosError
			console.log({ error })
		}
	}
	useEffect(() => {
		getOrder()
	}, [])

	return (
		<div className={style.suffix_form}>
			{order.setups?.map((setup, index) => (
				<OneSetup
					key={setup.id}
					setup={setup}
					metals={metals}
					openAlert={openAlert}
					onChange={onChange}
				/>
			))}
		</div>
	)
}
