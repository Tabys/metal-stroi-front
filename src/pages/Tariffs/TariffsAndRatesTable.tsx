import { useState } from 'react'
import { PriceRatesItem } from '../../models'
import { Alert } from 'react-bootstrap'
import { TariffsAndRatesItem } from './TariffsAndRatesItem'

type TariffsAndRatesTableProps = {
	ratesItems: PriceRatesItem[]
}

export function TariffsAndRatesTable({ ratesItems }: TariffsAndRatesTableProps) {
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
		}, 1000)
	}

	return (
		<>
			<div className='table'>
				<div className='row header'>
					<div className='p-2'>Наименование</div>
					<div className='p-2'>Тариф</div>
				</div>
				{ratesItems.map((item, index) => (
					<TariffsAndRatesItem item={item} key={item.id || index} openAlert={openAlert} />
				))}

				<Alert className='alert-fixed' show={alertShow.action} variant={alertShow.type}>
					{alertShow.message}
				</Alert>
			</div>
		</>
	)
}
