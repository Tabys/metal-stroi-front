import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { useMaterialPrices } from '../../hooks/priceMaterials'
import { PricesItems } from './pricesItems'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import { FormCreateNewThickness } from './FormCreateNewThickness'
import { useUser } from '../../hooks/currentUser'

export function PricesWrapper() {
	const { currentUser } = useUser()
	const { prices, refetchPrices } = useMaterialPrices()
	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	prices.sort((a, b) => (Number(a.sort) > Number(b.sort) ? 1 : -1))
	prices.forEach(prices => {
		prices.price_metal_items?.sort((a, b) => (Number(a.thickness) > Number(b.thickness) ? 1 : -1))
	})

	return (
		<>
			<Tabs defaultActiveKey='1' transition={false} id='noanim-tab-example' className='mb-3'>
				{prices &&
					prices.map(category => (
						<Tab eventKey={category.id} title={category.name} key={category.id}>
							<div className='container-fluid'>
								<div className='table half'>
									<div className='row header'>
										<div className='p-2'>Толщина металла</div>
										<div className='p-2'>Номер таблицы</div>
										<div className='p-2'>Цена</div>
										{currentUser?.['roles'] === 'ROLE_ADMIN' && <div className='p-2'>Удалить</div>}
									</div>
									{category.price_metal_items?.map(price => (
										<PricesItems price={price} key={price.id} update={openAlert} refetchPrices={refetchPrices} currentUser={currentUser!} />
									))}
								</div>

								<div className='form-add-metal'>
									{currentUser?.['roles'] === 'ROLE_ADMIN' && (
										<FormCreateNewThickness categoryId={category.id} openAlert={openAlert} refetchPrices={refetchPrices} />
									)}
								</div>
							</div>
						</Tab>
					))}
			</Tabs>
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Изменения сохранены
			</Alert>
		</>
	)
}
