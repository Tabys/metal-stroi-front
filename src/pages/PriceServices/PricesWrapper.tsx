import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { useServicePrices } from '../../hooks/priceServices'
import { PircesItems } from './pricesItems'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import { PircesRolling } from './PricesRolling'
import { PircesPainting } from './PricePainitng'

export function PricesWrapper() {
	const { prices } = useServicePrices()
	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const header: any = {
		1: [
			'Толщина металла (мм)',
			'Длинна металла',
			'Количество гибов',
			'Цена',
		],
		2: ['Толщина металла (мм)', 'Количество рубов', 'Цена'],
		3: ['Толщина металла (мм)', 'Цена'],
		4: ['Толщина металла (мм)', 'Цена'],
		5: ['Толщина металла (мм)', 'Цена за 1 м.п.', 'Цена за 1 врез'],
		6: ['Тип металл', 'Толщина металла (мм)', 'Цена', 'Мин. цена'],
		7: ['Тип металл', 'Толщина металла (мм)', 'Цена', 'Мин. цена'],
		8: ['Серия RAL', 'Цена'],
	}
	// console.log(prices)
	return (
		<>
			<Tabs
				defaultActiveKey='1'
				transition={false}
				id='noanim-tab-example'
				className='mb-3'
			>
				{prices &&
					prices.map(category => (
						<Tab
							eventKey={category.id}
							title={category.title}
							key={category.id}
						>
							<div className='table'>
								<div className='row header'>
									{header[category.id].map(
										(title: any, index: number) => (
											<div className='p-2' key={index}>
												{title}
											</div>
										)
									)}
								</div>
								{category.price_services_items
									? category.price_services_items?.map(
											price => (
												<PircesItems
													price={price}
													key={price.id}
													update={openAlert}
												/>
											)
									  )
									: ''}
								{category.price_services_rollings
									? category.price_services_rollings?.map(
											price => (
												<PircesRolling
													price={price}
													key={price.id}
													update={openAlert}
												/>
											)
									  )
									: ''}
								{category.price_services_paintings
									? category.price_services_paintings?.map(
											price => (
												<PircesPainting
													price={price}
													key={price.id}
													update={openAlert}
												/>
											)
									  )
									: ''}
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
