import { Metal } from '../../../../models'
import { FormMetalDetail } from './formMetalDetail'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import { useMaterials } from '../../../../hooks/materials'

interface FormProps {
	metal: Metal[]
	markup: number
	updMetal: () => void
}

export function FormMetalList({ metal, markup, updMetal }: FormProps) {
	metal.sort((a, b) => (a.thickness > b.thickness ? 1 : -1))
	const [alertShow, setAlertShow] = useState(false)
	const [alertErrorShow, setAlertErrorShow] = useState(false)
	const [textErrorAlert, setTextErrorAlert] = useState('')
	const { materials } = useMaterials()

	const openAlert = () => {
		setAlertShow(true)
		setTimeout(() => {
			setAlertShow(false)
		}, 1000)
	}

	const openErrorAlert = () => {
		setAlertErrorShow(true)
		setTimeout(() => {
			setAlertErrorShow(false)
		}, 1000)
	}

	return (
		<>
			{metal.map((item, index) => (
				<FormMetalDetail
					key={index}
					metal={item}
					openAlert={openAlert}
					openErrorAlert={openErrorAlert}
					updMetal={updMetal}
					materials={materials}
					setTextErrorAlert={setTextErrorAlert}
					markup={markup}
				/>
			))}
			<Alert className='alert-fixed' show={alertShow} variant='success'>
				Изменения сохранены
			</Alert>
			<Alert className='alert-fixed' show={alertErrorShow} variant='danger'>
				{textErrorAlert}
			</Alert>
		</>
	)
}
