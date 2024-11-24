import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../../../hooks/prepareDataList'
import { CreateDetailGroupList } from '../../detailList/createDetailGroupList'
import { PrepArrDetils } from '../components/prepArrDetails/prepArrDetails'
import { DocTableDetail, Order } from '../../../../models'
import styles from '../style.module.css'
import Table from 'react-bootstrap/Table'
import { PrepArrProducts } from '../components/prepArrProducts'
import { PaintingTable } from './paintingTable'
import { PaintingTableProducts } from './paintingTableProducts'
import { culcProductIndex } from './culcProductIndex'
import { usePaintingMods } from '../../../../hooks/paintingMods'
import { CulcTotalData } from '../components/culcTotalData'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import { Alert } from 'react-bootstrap'

export function DocPainting() {
	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const { id } = useParams()
	const { orders } = useOrders(id ? id : '')
	const { paintingMods } = usePaintingMods()
	const linkBX = process.env.REACT_APP_BX24_URL + `crm/deal/details/${id}/`

	const { register, handleSubmit } = useForm<Order>()

	const arrDetails = orders ? CreateDetailGroupList(orders) : undefined
	const details: DocTableDetail[] | undefined = PrepArrDetils({
		arrDetails,
		orders,
	})
	const filteredDetails = details?.filter(detail => detail.painting)
	const products = PrepArrProducts(orders)
	const productIndex = culcProductIndex(details)

	const total = CulcTotalData({ details, products, orders })

	const onSubmit: SubmitHandler<Order> = async data => {
		await axios.put<Order>(process.env.REACT_APP_BACKEND_API_URL + 'orders/', data)
		openAlert()
	}

	return (
		<>
			<div className='container doc-container'>
				<Link to='..' relative='path' className='back-link'>
					Вернуться назад
				</Link>
				<div className={styles.doc + ' ' + styles.full}>
					<div className='row g-2'>
						<div className={styles.doc_header}>
							<div className={styles.order_inf}>
								<a href={linkBX} target='_blank' rel='noreferrer' className={styles.order_number}>
									Заявка в цех ПП № {orders?.order_number}
								</a>
								<p>
									<strong>Заказчик:</strong> {orders?.customer}
								</p>
							</div>
						</div>
					</div>
					<Table bordered hover className='narrow_cells'>
						<thead>
							<tr>
								<th>№ п/п</th>
								<th>Наименование изделия</th>
								<th>Кол-во, шт</th>
								<th>Цвет</th>
								<th>Объем</th>
								<th>Стоимость</th>
							</tr>
						</thead>
						<tbody>
							{filteredDetails?.map((detail, index) => (
								<PaintingTable key={detail.id} detail={detail} index={index} paintingMods={paintingMods} />
							))}
							{products?.map((product, index) =>
								product.painting_cost ? (
									<PaintingTableProducts key={product.id} index={index} product={product} startIndex={productIndex} />
								) : (
									''
								)
							)}
							<tr className={styles.total}>
								<td colSpan={5}></td>
								<th>{(total.painting_all + total.prod_painting).toFixed(3)}</th>
							</tr>
						</tbody>
					</Table>

					<form className={styles.comment}>
						<p className={styles.heading}>Указания к производству работ:</p>
						<input type='hidden' {...register('id', {})} defaultValue={id} />
						<textarea
							{...register('comment_painting', {
								onBlur: handleSubmit(onSubmit),
							})}
							className={'form-control ' + styles.textarea}
							defaultValue={orders?.comment_painting}
						></textarea>
					</form>

					<Alert className='alert-fixed' show={alertShow} variant='success'>
						Комментарий сохранён
					</Alert>
				</div>
			</div>
		</>
	)
}
