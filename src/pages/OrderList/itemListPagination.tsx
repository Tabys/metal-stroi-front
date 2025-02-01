import { useOrders } from '../../hooks/orders'
import { OrderProfile } from './OrderProfile'
import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react'
import { ErrorMassage } from '../../components/ErrorMassage'
import { Loader } from '../../components/Loader'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import styles from './style.module.css'
import { useUsers } from '../../hooks/users'
import { useUser } from '../../hooks/currentUser'

type ItemListProp = {
	itemsPerPage: number
}
type Search = {
	id?: string
	name?: string
	creator?: string
	date?: string
}
type Options = {
	value: string
	label: string
}

export function ItemListPagination({ itemsPerPage }: ItemListProp) {
	const { users } = useUsers()
	const { currentUser } = useUser()

	const { register, handleSubmit, reset, control, setValue } = useForm<Search>()
	const [searchParams, setSearchParams] = useSearchParams()
	const { orders, totalItems, loading, error, fetchOrders } = useOrders()

	const options: Options[] = users.map(user => {
		return { value: user.last_name + ' ' + user.first_name, label: user.last_name + ' ' + user.first_name }
	})

	const defaultCreator = options.find(option => option.value === currentUser?.last_name + ' ' + currentUser?.first_name)?.value || ''
	const [isDefaultApplied, setIsDefaultApplied] = useState(false)

	const currentPage = parseInt(searchParams.get('page') || '1', 10) - 1
	const id = searchParams.get('id') || ''
	const name = searchParams.get('name') || ''
	const creator = searchParams.get('creator') || ''
	const date = searchParams.get('date') || ''

	useEffect(() => {
		if (!isDefaultApplied && !creator && defaultCreator) {
			setSearchParams(prevParams => {
				const params = new URLSearchParams(prevParams)
				params.set('creator', defaultCreator)
				params.set('page', '1')
				setValue('creator', defaultCreator)
				return params
			})

			setIsDefaultApplied(true)
		}
	}, [creator, defaultCreator, isDefaultApplied, setSearchParams, setValue])

	const onSubmit: SubmitHandler<Search> = data => {
		const params: any = {}
		if (data.id) params.id = data.id
		if (data.name) params.name = data.name
		if (data.creator) params.creator = data.creator
		if (data.date) params.date = data.date
		params.page = '1'

		setSearchParams(params)
	}

	const resetFilters = () => {
		setSearchParams({ page: '1' })
		reset({
			id: '',
			name: '',
			creator: '',
			date: '',
		})
	}

	const handlePageClick = (event: { selected: number }) => {
		const params: any = {
			id,
			name,
			creator,
			date,
			page: (event.selected + 1).toString(),
		}
		Object.keys(params).forEach(key => {
			if (!params[key]) {
				delete params[key]
			}
		})
		setSearchParams(params)
	}

	useEffect(() => {
		fetchOrders({
			id,
			name,
			creator,
			date,
			page: currentPage,
			itemsPerPage,
		})
	}, [id, name, creator, date, currentPage, itemsPerPage, fetchOrders])

	const pageCount = Math.ceil(totalItems / itemsPerPage)

	return (
		<>
			<div id='container' className='container-flued px-5 mb-5'>
				<div className={styles.search + '  mb-5'}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.inputs}>
							<div className={styles.group + '  mb-3'}>
								<label>ID сделки:</label>
								<input {...register('id')} className='form-control' defaultValue={id} />
							</div>
							<div className={styles.group + '  mb-3'}>
								<label>Название сделки:</label>
								<input {...register('name')} className='form-control' defaultValue={name} />
							</div>
							<div className={styles.group + '  mb-3'}>
								<label>Технолог:</label>
								<Controller
									control={control}
									name={'creator'}
									defaultValue={creator || defaultCreator}
									render={({ field: { onChange, value, ref } }) => (
										<Select
											className='filters-container'
											classNamePrefix='filters-select'
											isSearchable={true}
											value={options.find(option => option.value === value)}
											onChange={val => onChange(val?.value)}
											isDisabled={options.length > 0 ? false : true}
											options={options}
											placeholder='Нажми'
										/>
									)}
								/>
							</div>
							<div className={styles.group + '  mb-3'}>
								<label>Дата создания:</label>
								<input {...register('date')} type='date' className='form-control' defaultValue={date} />
							</div>
						</div>
						<div className={styles.buttons}>
							<button type='submit' className='btn btn-primary'>
								Применить фильтры
							</button>
							<button onClick={resetFilters} className='btn btn-primary'>
								Сбросить фильтры
							</button>
						</div>
					</form>
				</div>

				{loading && <Loader />}
				{error && <ErrorMassage error={error} />}
				<div className='row g-2'>
					{orders &&
						orders.map(order => (
							<OrderProfile
								order={order}
								key={order.id}
								update={() =>
									fetchOrders({
										id,
										name,
										creator,
										date,
										page: currentPage,
										itemsPerPage,
									})
								}
							/>
						))}
				</div>
				{pageCount > 1 && (
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
						forcePage={currentPage}
					/>
				)}
			</div>
		</>
	)
}
