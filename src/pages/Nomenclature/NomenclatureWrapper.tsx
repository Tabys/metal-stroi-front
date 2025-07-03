import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import { PricesItemsWorkshopMaterial } from '../PriceMaterials/PricesItemsWorkshopMaterial'
import { AddNomenclatureModal } from '../../components/modal/AddNomenclatureModal'
import { useWorkshopMaterials } from '../../hooks/useWorkshopMaterials'

export function NomenclatureWrapper() {
	const { workshopMaterial, updateWorkshopMaterial } = useWorkshopMaterials()

	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	return (
		<>
			<Tabs defaultActiveKey='nomenclature' transition={false} id='noanim-tab-example' className='mb-3'>
				<Tab eventKey={'nomenclature'} title={'Номенклатура'}>
					<AddNomenclatureModal onAdd={updateWorkshopMaterial} />
					<div className='table'>
						<div className='row header'>
							<div className='p-2'>Наименование позиции</div>
							<div className='p-2'>Вес за единицу, кг</div>
							<div className='p-2'>Цена за единицу</div>
							<div className='p-2'>ID в BX24</div>
							<div className='p-2'></div>
						</div>
						{workshopMaterial.map(nomenclature => (
							<PricesItemsWorkshopMaterial
								nomenclature={nomenclature}
								key={nomenclature.id}
								update={openAlert}
								updateWorkshopMaterial={updateWorkshopMaterial}
							/>
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
