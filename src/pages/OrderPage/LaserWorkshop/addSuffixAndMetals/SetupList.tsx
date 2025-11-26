import { useState } from 'react'
import { AddSuffix, FormatedSetupsData, MetalType, Order } from '../../../../models'
import { OneSetup } from './oneSetup'
import Select from 'react-select'
import style from './style.module.css'
import { getOptionsMetals } from './optionsMetals'

type SetupListProp = {
	data: FormatedSetupsData | undefined
	setArrSuffix: React.Dispatch<React.SetStateAction<AddSuffix[]>>
	arrSuffix: AddSuffix[]
	dubleDetails: number[]
	metals: MetalType[] | null
	order: Order
}

export function SetupList({ dubleDetails, metals, data, setArrSuffix, arrSuffix, order }: SetupListProp) {
	const [checkedAzote, setCheckedAzote] = useState(false)
	const [valueSuffixSelect, setSuffixValueSelect] = useState<any>()
	const [valueMetalSelect, setValueMetalSelect] = useState<any>()

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

	const arrOptions = metals?.find(metal => metal.abbreviation === data?.setups?.[0].material)?.options || []
	const options = arrOptions.map(value => {
		return { value: value, label: value }
	})

	data?.setups?.sort((a, b) => (a.unique > b.unique ? 1 : -1))
	return (
		<div className={style.setups_group}>
			<div className={style.group_thickness}>
				<h2>
					S{data?.thickness} ({data?.metals}) {order?.customers_metal ? '- металл заказчика' : ''}
				</h2>
				<div className={style.controllers}>
					<label className={style.label}>
						<span className={style.span}>Азот:</span>{' '}
						<input type='checkbox' name='azote' onChange={handleChangeAzote} className='form-check-input' disabled={data?.metals === '1.4301'} />
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
						allCheckedAzote={checkedAzote}
						allValueMetalSelect={valueMetalSelect}
						allValueSuffixSelect={valueSuffixSelect}
					/>
				))}
			</div>
		</div>
	)
}
