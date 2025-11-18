import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import { DocumentClient } from './DocumentClient/DocumentClient'
import { useStaticData } from '../../hooks/useStaicData'

export function StaticDataWrapper() {
	const [alertShow, setAlertShow] = useState({
		action: false,
		type: 'success',
		message: 'Изменения сохранены',
	})
	const { staticData } = useStaticData()

	const openAlert = (type: string, massage?: string) => {
		setAlertShow({
			action: true,
			type: type,
			message: massage ?? 'Изменения сохранены',
		})
		setTimeout(() => {
			setAlertShow({
				action: false,
				type: 'type',
				message: massage ?? 'Изменения сохранены',
			})
		}, 1500)
	}

	return (
		<>
			<Tabs defaultActiveKey='BlancClient' transition={false} id='noanim-tab-example' className='mb-3'>
				<Tab title='Бланк Клиенту' eventKey='BlancClient'>
					<DocumentClient openAlert={openAlert} staticData={staticData.find(item => item.category === 'blanc_client')?.columns as JSON} />
				</Tab>
			</Tabs>
			<Alert className='alert-fixed' show={alertShow.action} variant={alertShow.type}>
				{alertShow.message}
			</Alert>
		</>
	)
}
