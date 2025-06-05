import { AddSuffix, MetalType, Setup } from '../../../../models'
import Select from 'react-select'
import { listMetalName } from '../detailList/listMetalName'
import { useEffect, useState } from 'react'
import { OneDetail } from './oneDetail'
import style from './style.module.css'
import { getOptionsMetals } from './optionsMetals'

type OneSetupProps = {
	setup: Setup
	arrSuffix: AddSuffix[]
	allValueMetalSelect: any
	allValueSuffixSelect: any
	allChecked: boolean
	allCheckedAzote: boolean
	dubleDetails: number[]
	metals: MetalType[] | null
	setArrSuffix: React.Dispatch<React.SetStateAction<AddSuffix[]>>
}

export function OneSetup({
	dubleDetails,
	allValueSuffixSelect,
	allValueMetalSelect,
	allChecked,
	allCheckedAzote,
	metals,
	setup,
	arrSuffix,
	setArrSuffix,
}: OneSetupProps) {
	const standartValue = arrSuffix.find(item => {
		return item.id === Number(setup.id)
	})
	const [valueSuffixSelect, setValueSuffixSelect] = useState<any>(standartValue?.suffixes)
	const [valueMetalSelect, setValueMetalSelect] = useState<any>()
	const [checked, setChecked] = useState<boolean>(setup.customers_metal)
	const [checkedAzote, setCheckedAzote] = useState<boolean>(setup.azote)

	useEffect(() => {
		setChecked(allChecked)
	}, [allChecked])
	useEffect(() => {
		setValueMetalSelect(allValueMetalSelect)
	}, [allValueMetalSelect])
	useEffect(() => {
		setValueSuffixSelect(allValueSuffixSelect)
	}, [allValueSuffixSelect])
	useEffect(() => {
		setCheckedAzote(allCheckedAzote)
	}, [allCheckedAzote])

	useEffect(() => {
		setValueSuffixSelect(standartValue?.suffixes)
		setChecked(setup.customers_metal)
		setCheckedAzote(setup.azote)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const arrOptions = listMetalName(setup.material)
	const options = arrOptions.map(value => {
		return { value: value, label: value }
	})
	const optionsMetals: any = getOptionsMetals({ metals, setup })

	const handleChange = (value: any) => {
		setValueSuffixSelect(value)
		setArrSuffix(prevArrSetup => {
			let updatedSetupsList = prevArrSetup
			const objIndex = updatedSetupsList.findIndex(obj => obj.id === Number(setup.id))
			updatedSetupsList[objIndex].suffixes = value
			return updatedSetupsList
		})
	}

	const handleChangeMetal = (value: any) => {
		setValueMetalSelect(value)
		setArrSuffix(prevArrSetup => {
			let updatedSetupsList = prevArrSetup
			const objIndex = updatedSetupsList.findIndex(obj => obj.id === Number(setup.id))
			updatedSetupsList[objIndex].metals = value
			return updatedSetupsList
		})
	}

	const handleChangeCustomersMetal = () => {
		setChecked(!checked)
		setArrSuffix(prevArrSetup => {
			let updatedSetupsList = prevArrSetup
			const objIndex = updatedSetupsList.findIndex(obj => obj.id === Number(setup.id))
			updatedSetupsList[objIndex].customers_metal = !checked
			return updatedSetupsList
		})
	}

	const handleChangeAzote = () => {
		setCheckedAzote(!checkedAzote)
		setArrSuffix(prevArrSetup => {
			let updatedSetupsList = prevArrSetup
			const objIndex = updatedSetupsList.findIndex(obj => obj.id === Number(setup.id))
			updatedSetupsList[objIndex].azote = !checkedAzote
			return updatedSetupsList
		})
	}

	return (
		<div className={style.setup}>
			<div className={style.title}>
				<p>
					Имя программы: <strong>{setup.unique}</strong>
				</p>
				<p>
					Заготовка: <strong>{setup.work_piece}</strong>
				</p>
				<p>
					Мин. заготовка: <strong>{setup.min_work_piece}</strong>
				</p>
			</div>
			<div className={style.group}>
				<div className={style.details}>
					{setup.details?.map(detail => (
						<OneDetail key={detail.id} detail={detail} dubleDetails={dubleDetails} />
					))}
					<div className={style.detail + ' ' + style.empty}></div>
				</div>
				<div>
					<label className={style.select_label}>
						Азот:{' '}
						<input
							type='checkbox'
							name={'azote' + setup.id}
							checked={checkedAzote}
							className='form-check-input'
							onChange={handleChangeAzote}
							disabled={setup?.material === '1.4301'}
						/>
					</label>
					<label className={style.select_label}>
						Металл заказчика:{' '}
						<input
							type='checkbox'
							name={'customers_metal' + setup.id}
							checked={checked}
							className='form-check-input'
							onChange={handleChangeCustomersMetal}
						/>
					</label>

					<label className={style.select_label}>Суффиксы: </label>
					<Select
						name={'Setup' + setup.id}
						closeMenuOnSelect={false}
						isSearchable={false}
						value={valueSuffixSelect}
						onChange={value => handleChange(value)}
						options={options}
						isDisabled={options.length > 0 ? false : true}
						isMulti
						className='suffixes'
						menuPlacement='auto'
						placeholder='Выбери для изменения'
					/>
					<label className={style.select_label}>Виды металлов: </label>
					<Select
						name={'Metal' + setup.id}
						closeMenuOnSelect={true}
						isSearchable={false}
						value={valueMetalSelect}
						onChange={value => handleChangeMetal(value)}
						options={optionsMetals}
						className='chg_metals'
						isClearable={true}
						menuPlacement='auto'
						placeholder='Выбери для изменения'
					/>
				</div>
			</div>
		</div>
	)
}
