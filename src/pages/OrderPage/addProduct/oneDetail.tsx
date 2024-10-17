import { useEffect, useState } from 'react'
import { AddProduct, Detail } from '../../../models'
import styles from './style.module.css'
import { FaSignal } from 'react-icons/fa6'
import { AvailableDetail } from './availableDatail'

type OneDetailProps = {
	detail: Detail
	setArrProduct: React.Dispatch<React.SetStateAction<AddProduct>>
}

export function OneDetail({ detail, setArrProduct }: OneDetailProps) {
	const [value, setValue] = useState('0')

	let availableDetails = 0

	useEffect(() => {
		availableDetails = AvailableDetail(detail)
	}, [detail])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)

		setArrProduct(prevArrProduct => {
			const isDetailInDetailGroup = prevArrProduct?.details?.find(item => item.id === Number(event.target.name))
			let { details: updatedDetailsList } = prevArrProduct

			if (isDetailInDetailGroup === undefined) {
				updatedDetailsList.push({
					id: Number(event.target.name),
					name: event.target.title,
					count: Number(event.target.value),
				})
			} else {
				if (Number(event.target.value) !== 0) {
					const objIndex = updatedDetailsList.findIndex(obj => obj.id === Number(event.target.name))
					updatedDetailsList[objIndex].count = Number(event.target.value)
				} else {
					updatedDetailsList = updatedDetailsList.filter(detail => detail.id !== Number(event.target.name))
				}
			}

			return { ...prevArrProduct, details: updatedDetailsList }
		})
	}

	return (
		<>
			{availableDetails > 0 ? (
				<div className={styles.group}>
					<p>{detail.name} </p>
					<div className={styles.control}>
						<p>
							<FaSignal /> {availableDetails}шт.
						</p>
						<input
							name={detail.id}
							title={detail.name}
							type='number'
							max={availableDetails}
							min='0'
							value={value}
							onChange={handleChange}
							className='form-control'
						/>
					</div>
				</div>
			) : (
				''
			)}
		</>
	)
}
