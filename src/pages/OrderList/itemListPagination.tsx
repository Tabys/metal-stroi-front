import { useOrders } from '../../hooks/orders'
import { OrderProfile } from './OrderProfile'
import ReactPaginate from 'react-paginate'
import { Order } from '../../models'
import { useState, useEffect } from 'react'
import { ErrorMassage } from '../../components/ErrorMassage'
import { Loader } from '../../components/Loader'
import { SubmitHandler, useForm } from 'react-hook-form'

type ItemListProp = {
	itemsPerPage: number
}
type Search = {
	name: string
}

export function ItemListPagination({ itemsPerPage }: ItemListProp) {
	const { register, handleSubmit } = useForm<Search>()

	const { loading, error, orders, delOrder } = useOrders()

	const onSubmit: SubmitHandler<Search> = data => {
		const filteredItems = orders.filter(
			({ id, customer }) =>
				String(id).includes(data.name) ||
				customer?.toLowerCase().includes(data.name.toLowerCase())
		)
		const endOffset = itemOffset + itemsPerPage
		setCurrentItems(filteredItems.slice(itemOffset, endOffset))
		setPageCount(Math.ceil(filteredItems.length / itemsPerPage))
	}

	const [currentItems, setCurrentItems] = useState<Order[]>([])
	const [pageCount, setPageCount] = useState(0)
	const [itemOffset, setItemOffset] = useState(0)

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage
		setCurrentItems(orders.slice(itemOffset, endOffset))
		setPageCount(Math.ceil(orders.length / itemsPerPage))
	}, [itemOffset, itemsPerPage, orders])

	const handlePageClick = (event: { selected: number }) => {
		const newOffset = (event.selected * itemsPerPage) % orders.length
		setItemOffset(newOffset)
	}

	return (
		<>
			<div id='container' className='container-flued px-5 mb-5'>
				<div className='search mb-5'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='mb-3'>
							<input
								{...register('name', {
									onChange: handleSubmit(onSubmit),
								})}
								className='form-control'
								placeholder='Поиск'
							/>
						</div>
					</form>
				</div>

				{loading && <Loader />}
				{error && <ErrorMassage error={error} />}
				<div className='row  g-2'>
					{currentItems &&
						currentItems
							.map(order => (
								<OrderProfile
									order={order}
									key={order.id}
									update={delOrder}
								/>
							))
							.reverse()}
				</div>
				{orders.length > itemsPerPage ? (
					<ReactPaginate
						nextLabel='>'
						onPageChange={handlePageClick}
						pageRangeDisplayed={3}
						marginPagesDisplayed={2}
						pageCount={pageCount}
						previousLabel='<'
						pageClassName='page-item'
						pageLinkClassName='page-link'
						previousClassName='page-item'
						previousLinkClassName='page-link'
						nextClassName='page-item'
						nextLinkClassName='page-link'
						breakLabel='...'
						breakClassName='page-item'
						breakLinkClassName='page-link'
						containerClassName='pagination mt-3'
						activeClassName='active'
						renderOnZeroPageCount={null}
					/>
				) : (
					''
				)}
			</div>
		</>
	)
}
