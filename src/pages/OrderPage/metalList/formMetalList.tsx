import { Metal } from '../../../models'
import { FormMetalDetail } from './formMetalDetail'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'

interface FormProps {
	metal: Metal[]
	updMetal: () => void
}

export function FormMetalList({ metal, updMetal }: FormProps) {
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
				<FormMetalDetail key={index} metal={item} openAlert={openAlert} updMetal={updMetal} />
			))}
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Изменения сохранены
			</Alert>
		</>
	)
}
