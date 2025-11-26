import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { useMaterialPrices } from '../../hooks/priceMaterials'
import { PricesItems } from './pricesItems'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import { FormCreateNewThickness } from './FormCreateNewThickness'
import { useUser } from '../../hooks/currentUser'
import { useWorkPiece } from '../../hooks/useWorkPiece'
import { AddMaterials } from './addMaterials'

export function PricesWrapper() {
	const { currentUser } = useUser()
	const { prices, refetchPrices } = useMaterialPrices()
	const { workPiece } = useWorkPiece()
	const [alertShow, setAlertShow] = useState({
		action: false,
		type: 'success',
		message: 'Изменения сохранены',
	})

	const openAlert = (type: string, message?: string) => {
		setAlertShow({
			action: true,
			type: type,
			message: message ?? 'Изменения сохранены',
		})
		setTimeout(() => {
			setAlertShow({
				action: false,
				type: 'type',
				message: message ?? 'Изменения сохранены',
			})
		}, 1500)
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
							<div className='container-fluid-prices'>
								<div className='table half'>
									<div className='row header'>
										<div className='p-2'>Толщина металла</div>
										<div className='p-2'>Номер таблицы</div>
										<div className='p-2'>Размер заготовки</div>
										<div className='p-2'>Цена</div>
										{currentUser?.['roles'] === 'ROLE_ADMIN' && <div className='p-2'>Удалить</div>}
									</div>
									{category.price_metal_items?.map(price => (
										<PricesItems
											price={price}
											key={price.id}
											material={category.abbreviation}
											update={openAlert}
											refetchPrices={refetchPrices}
											currentUser={currentUser!}
											workPieces={workPiece}
										/>
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
				<Tab eventKey='add-material' title='+' key='add-material'>
					<AddMaterials refetchPrices={refetchPrices} openAlert={openAlert} pricesCategories={prices} />
				</Tab>
			</Tabs>
			<Alert className='alert-fixed' show={alertShow.action} variant={alertShow.type}>
				{alertShow.message}
			</Alert>
		</>
	)
}
