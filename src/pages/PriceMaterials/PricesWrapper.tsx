import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { useMaterialPrices } from '../../hooks/priceMaterials'
import { PricesItems } from './pricesItems'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import { PricesItemsWorkshopMaterial } from './PricesItemsWorkshopMaterial'
import { AddNomenclatureModal } from '../../components/modal/AddNomenclatureModal'
import { useWorkshopMaterials } from '../../hooks/useWorkshopMaterials'

export function PricesWrapper() {
	const { prices } = useMaterialPrices()
	const { workshopMaterial, updateWorkshopMaterial } = useWorkshopMaterials()

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
							<div className='table'>
								<div className='row header'>
									<div className='p-2'>Толщина металла</div>
									<div className='p-2'>Номер таблицы</div>
									<div className='p-2'>Цена</div>
								</div>
								{category.price_metal_items?.map(price => (
									<PricesItems price={price} key={price.id} update={openAlert} />
								))}
							</div>
						</Tab>
					))}
				<Tab eventKey={'nomenclature'} title={'Номенклатура'}>
					<AddNomenclatureModal onAdd={updateWorkshopMaterial} />
					<div className='table'>
						<div className='row header'>
							<div className='p-2'>Наименование позиции</div>
							<div className='p-2'>Вес за единицу, кг</div>
							<div className='p-2'>Цена за единицу</div>
						</div>
						{workshopMaterial.map(nomenclature => (
							<PricesItemsWorkshopMaterial nomenclature={nomenclature} key={nomenclature.id} update={openAlert} />
						))}
					</div>
				</Tab>
			</Tabs>
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Изменения сохранены
			</Alert>
		</>
	)
}
