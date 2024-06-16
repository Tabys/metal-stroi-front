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

	return (
		<>
			<div className='table'>
				<div className='row header'>
					<div className='p-2'>Аббревиатура металла</div>
					<div className='p-2'>Наименование металла</div>
					<div className='p-2'>Цена за кг</div>
				</div>
				{prices.map(price => (
					<PircesItems
						price={price}
						key={price.id}
						update={openAlert}
					/>
				))}
			</div>
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Изменения сохранены
			</Alert>
		</>
	)
}
