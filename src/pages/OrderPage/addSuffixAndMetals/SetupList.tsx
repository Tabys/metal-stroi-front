import { useState } from 'react'
import { AddSuffix, FormatedSetupsData, MetalType } from '../../../models'
import { OneSetup } from './oneSetup'
import Select from 'react-select'
import style from './style.module.css'
import { getOptionsMetals } from './optionsMetals'
import { listMetalName } from '../detailList/listMetalName'

type SetupListProp = {
	data: FormatedSetupsData | undefined
	setArrSuffix: React.Dispatch<React.SetStateAction<AddSuffix[]>>
	arrSuffix: AddSuffix[]
	dubleDetails: number[]
	metals: MetalType[] | null
}

export function SetupList({ dubleDetails, metals, data, setArrSuffix, arrSuffix }: SetupListProp) {
	const [checked, setChecked] = useState(false)
	const [checkedAzote, setCheckedAzote] = useState(false)
	const [valueSuffixSelect, setSuffixValueSelect] = useState<any>()
	const [valueMetalSelect, setValueMetalSelect] = useState<any>()

	const handleChange = () => {
		setChecked(!checked)
		setArrSuffix(prevArrSetup => {
			let updatedSetupsList = prevArrSetup
			data?.setups?.forEach(setup => {
				const objIndex = updatedSetupsList.findIndex(obj => obj.id === Number(setup.id))
				updatedSetupsList[objIndex].customers_metal = !checked
			})
			return updatedSetupsList
		})
	}

	const handleChangeAzote = () => {
		setCheckedAzote(!checkedAzote)
		setArrSuffix(prevArrSetup => {
			let updatedSetupsList = prevArrSetup
			data?.setups?.forEach(setup => {
				const objIndex = updatedSetupsList.findIndex(obj => obj.id === Number(setup.id))
				updatedSetupsList[objIndex].azote = !checkedAzote
			})
			return updatedSetupsList
		})
	}

	const handleChangeSuffix = (value: any) => {
		setSuffixValueSelect(value)
		setArrSuffix(prevArrSetup => {
			let updatedSetupsList = prevArrSetup
			data?.setups?.forEach(setup => {
				const objIndex = updatedSetupsList.findIndex(obj => obj.id === Number(setup.id))
				updatedSetupsList[objIndex].suffixes = value
			})
			return updatedSetupsList
		})
	}

	const handleChangeMetal = (value: any) => {
		setValueMetalSelect(value)
		setArrSuffix(prevArrSetup => {
			let updatedSetupsList = prevArrSetup
			data?.setups?.forEach(setup => {
				const objIndex = updatedSetupsList.findIndex(obj => obj.id === Number(setup.id))
				updatedSetupsList[objIndex].metals = value
			})
			return updatedSetupsList
		})
	}

	const optionsMetals: any = getOptionsMetals({ metals: metals, setup: data?.setups?.[0] })

	const arrOptions = listMetalName(data?.setups?.[0].material)
	const options = arrOptions.map(value => {
		return { value: value, label: value }
	})

	data?.setups?.sort((a, b) => (a.unique > b.unique ? 1 : -1))
	return (
		<div className={style.setups_group}>
			<div className={style.group_thickness}>
				<h2>
					S{data?.thickness} ({data?.metals}) {data?.customer_metal ? '- металл заказчика' : ''}
				</h2>
				<div className={style.controllers}>
					<label className={style.label}>
						<span className={style.span}>Азот:</span>{' '}
						<input
							type='checkbox'
							name='azote'
							onChange={handleChangeAzote}
							className='form-check-input'
							disabled={data?.metals === '1.4301' || data?.metals === 'aisi430' ? false : true}
						/>
					</label>
					<label className={style.label}>
						<span className={style.span}>Металл заказчика:</span>{' '}
						<input type='checkbox' name='customers_metal' onChange={handleChange} className='form-check-input' />
					</label>
					<label className={style.label}>
						<span className={style.span}>Общий вид металла:</span>
						<Select
							name={'Metal'}
							closeMenuOnSelect={true}
							isSearchable={false}
							value={valueMetalSelect}
							onChange={value => handleChangeMetal(value)}
							options={optionsMetals}
							className='chg_metals'
							isClearable={true}
							placeholder='Выбери для изменения'
						/>
					</label>
					<label className={style.label}>
						<span className={style.span}>Общий суффикс:</span>
						<Select
							name={'Suffix'}
							closeMenuOnSelect={false}
							isSearchable={false}
							value={valueSuffixSelect}
							onChange={value => handleChangeSuffix(value)}
							options={options}
							isDisabled={options.length > 0 ? false : true}
							isMulti
							className='suffixes'
							placeholder='Выбери для изменения'
						/>
					</label>
				</div>
			</div>
			<div className={style.wrap_setups}>
				{data?.setups?.map((setup, index) => (
					<OneSetup
						key={setup.id}
						metals={metals}
						setup={setup}
						arrSuffix={arrSuffix}
						setArrSuffix={setArrSuffix}
						dubleDetails={dubleDetails}
						allChecked={checked}
						allCheckedAzote={checkedAzote}
						allValueMetalSelect={valueMetalSelect}
						allValueSuffixSelect={valueSuffixSelect}
					/>
				))}
			</div>
		</div>
	)
}
