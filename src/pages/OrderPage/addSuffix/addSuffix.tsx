import axios from 'axios'
import { AddSuffix, Order } from '../../../models'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { SetupList } from './SetupList'

type AddSuffixProps = {
	onCreate: () => void
	onClose: () => void
	order: Order
}

export function AddSuffixes({ onCreate, onClose, order }: AddSuffixProps) {
	const { handleSubmit } = useForm<AddSuffix>()

	const initialData = order.setups?.map(setup => {
		return {
			id: Number(setup.id),
			suffixes: setup.suffixes,
		}
	})

	const [arrSuffix, setArrSuffix] = useState<AddSuffix[]>(
		initialData ? initialData : []
	)

	const onSubmit: SubmitHandler<AddSuffix> = async data => {
		await axios.put<AddSuffix>(
			process.env.REACT_APP_BACKEND_API_URL + 'setup/suffixes',
			arrSuffix
		)
		await onClose()
		await onCreate()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SetupList
				order={order}
				setArrSuffix={setArrSuffix}
				arrSuffix={initialData ? initialData : []}
			/>

			<button type='submit' className='btn btn-primary container-fluid'>
				Добавить
			</button>
		</form>
	)
}
