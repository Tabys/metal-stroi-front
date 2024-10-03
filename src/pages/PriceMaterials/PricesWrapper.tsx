import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { useMaterialPrices } from '../../hooks/priceMaterials'
import { PircesItems } from './pricesItems'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'

export function PricesWrapper() {
	const { prices } = useMaterialPrices()
	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const clearPrice = prices.map(category => ({
		id: category.id,
		abbreviation: category.abbreviation,
		name: category.name,
		price_metal_items: category?.price_metal_items?.filter(item => {
			return item.gas !== 'azote'
		}),
	}))
	clearPrice.forEach(prices => {
		prices.price_metal_items?.sort((a, b) =>
			Number(a.thickness) > Number(b.thickness) ? 1 : -1
		)
	})

	return (
		<>
			<Tabs
				defaultActiveKey='1'
				transition={false}
				id='noanim-tab-example'
				className='mb-3'
			>
				{clearPrice &&
					clearPrice.map(category => (
						<Tab
							eventKey={category.id}
							title={category.name}
							key={category.id}
						>
							<div className='table'>
								<div className='row header'>
									<div className='p-2'>Толщина металла</div>
									<div className='p-2'>Номер таблицы</div>
									<div className='p-2'>Цена</div>
								</div>
								{category.price_metal_items?.map(price => (
									<PircesItems
										allPrices={prices}
										price={price}
										key={price.id}
										update={openAlert}
									/>
								))}
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
