import { Metal } from '../../../models'
import { FormMetalDetail } from './formMetalDetail'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'

interface FormProps {
	metal: Metal[]
}

export function FormMetalList({ metal }: FormProps) {
	const [alertShow, setAlertShow] = useState(false)

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}
	return (
		<>
			{metal.map((item, index) => (
				<FormMetalDetail
					key={index}
					metal={item}
					updMetal={openAlert}
				/>
			))}
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Изменения сохранены
			</Alert>
		</>
	)
}
