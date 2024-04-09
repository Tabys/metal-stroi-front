import { AddSuffix, Detail, Setup } from '../../../models'
import Select from 'react-select'
import { listMetalName } from '../detailList/listMetalName'
import { useState } from 'react'
import { OneDetail } from './oneDetail'
import style from './style.module.css'

type OneSetupProps = {
	setup: Setup
	arrDetails: Detail[]
	arrSuffix: AddSuffix[]
	setArrSuffix: React.Dispatch<React.SetStateAction<AddSuffix[]>>
}

export function OneSetup({
	setup,
	arrDetails,
	arrSuffix,
	setArrSuffix,
}: OneSetupProps) {
	const standartValue = arrSuffix.find(item => {
		return item.id === Number(setup.id)
	})
	const [valueSelect, setValueSelect] = useState<any>(standartValue?.suffixes)

	const arrOptions = listMetalName(setup.material)

	const options = arrOptions.map(value => {
		return { value: value, label: value }
	})

	const addDetails = arrDetails.filter(detail => {
		const setupIndexes = detail.additional_setups?.split(' ')
		const result = setupIndexes?.filter(index => {
			return Number(index) === Number(setup.order_index)
		})
		return result?.length
	})

	const handleChange = (value: any) => {
		setValueSelect(value)
		setArrSuffix(prevArrSetup => {
			let updatedSetupsList = prevArrSetup
			const objIndex = updatedSetupsList.findIndex(
				obj => obj.id === Number(setup.id)
			)
			updatedSetupsList[objIndex].suffixes = value

			return updatedSetupsList
		})
	}

	return (
		<div className={style.setup}>
			<div className={style.title}>
				<div className={style.top}>
					<p>
						<strong>{setup.material}</strong>
					</p>
					<p>
						Таблица: <strong>{setup.table_number}</strong>
					</p>
				</div>
				<div className={style.work_piece}>
					<p>
						Заготовка: <strong>{setup.work_piece}</strong>
					</p>
					<p>
						Мин. заготовка: <strong>{setup.min_work_piece}</strong>
					</p>
				</div>
			</div>
			<div className={style.details}>
				{setup.details?.map(detail => (
					<OneDetail key={detail.id} detail={detail} />
				))}
				{addDetails.map(detail => (
					<OneDetail key={detail.id} detail={detail} />
				))}
				<div className={style.detail + ' ' + style.empty}></div>
			</div>
			<Select
				name={'Setup' + setup.id}
				closeMenuOnSelect={false}
				isSearchable={false}
				value={valueSelect}
				onChange={value => handleChange(value)}
				options={options}
				isMulti
				placeholder='Нажми'
			/>
		</div>
	)
}
