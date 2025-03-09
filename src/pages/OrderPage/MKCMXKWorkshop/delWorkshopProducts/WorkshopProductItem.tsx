import { SubmitHandler, useForm } from 'react-hook-form'
import { WorkshopProduct } from '../../../../models'
import style from './style.module.css'
import { FaRegTrashCan } from 'react-icons/fa6'
import apiClient from '../../../../components/apiClient'

type WorkshopProductProps = {
	workshop_product: WorkshopProduct
	onDel: () => void
}

export function WorkshopProductItem({ workshop_product, onDel }: WorkshopProductProps) {
	const { handleSubmit } = useForm<WorkshopProduct>()

	const onSubmit: SubmitHandler<WorkshopProduct> = async data => {
		await apiClient
			.delete<WorkshopProduct>(`workshops-products/`, { data: { id: workshop_product.id } })
			.then(result => {
				onDel()
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<form className={style.workshop_product} onSubmit={handleSubmit(onSubmit)}>
			<div className={style.title}>
				<div className={style.group}>
					<div className={style.top}>
						<p>
							<strong>{workshop_product.name}</strong>
						</p>
						<p>
							Количество: <strong>{workshop_product.quantity}</strong>
						</p>
					</div>
				</div>
				<button type='submit' className='btn btn-link container-fluid'>
					<FaRegTrashCan />
				</button>
			</div>
		</form>
	)
}
