import { useForm } from 'react-hook-form'
import { Detail } from '../../../../../../models'
import styles from '../../style.module.css'
import Tooltip from '../../../../../../components/Tooltip'
import apiClient from '../../../../../../components/apiClient'
import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'

type PPOnePriceProps = {
	detail: Detail
	onUpdate: () => void
}

export const PPOnePrice = ({ detail, onUpdate }: PPOnePriceProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const { handleSubmit } = useForm()

	const onSubmit = async (data: any) => {
		setIsLoading(true)
		await apiClient
			.put<Detail>('detail/upd-pp-one-price', {
				order_id: detail.order_id,
				price: detail.polymer_one_element_price,
			})
			.then(number => {
				onUpdate()
				setIsLoading(false)
			})
			.catch(err => {
				console.log(err)
				setIsLoading(false)
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Tooltip conditions={true} text='Скопировать цену первого элемента на все детали'>
				<button type='submit' className={styles.btnCopy}>
					{isLoading ? <FaSpinner /> : <i className='fi fi-sr-duplicate'></i>}
				</button>
			</Tooltip>
		</form>
	)
}
