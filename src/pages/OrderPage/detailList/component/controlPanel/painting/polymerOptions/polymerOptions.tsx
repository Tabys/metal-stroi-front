import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Select from 'react-select'
import { PaintingMods } from '../../../../../../../models'
import styles from '../../../../style.module.css'
import apiClient from '../../../../../../../components/apiClient'

type PolymerOptionsProps = {
	orderId: number
	paintingMods: PaintingMods[]
	update: () => void
	openAlert: (type: string, message?: string) => void
}

type PolymerOptionsForm = {
	polymer_options: JSON[]
}

export function PolymerOptions({ orderId, paintingMods, update, openAlert }: PolymerOptionsProps) {
	const { handleSubmit, control } = useForm<PolymerOptionsForm>()

	const options: any[] = paintingMods.map(paintingMod => {
		return {
			value: paintingMod.id,
			label: <i className={'fi ' + paintingMod.icon}></i>,
		}
	})

	const onSubmit: SubmitHandler<PolymerOptionsForm> = async data => {
		await apiClient
			.put<PolymerOptionsForm>('detail/set-all-pp-options', {
				id: orderId,
				polymer_options: data.polymer_options ? data.polymer_options : [],
			})
			.then(result => {
				update()
				openAlert('success', 'Изменения сохранены')
			})
			.catch(err => {
				openAlert('danger', 'Ошибка')
				console.log(err.response)
			})
	}

	return (
		<form className={styles.pp_set_options}>
			<Controller
				control={control}
				name={'polymer_options'}
				render={({ field: { onChange, onBlur, value, ref } }) => (
					<Select
						classNamePrefix='polymer-select'
						closeMenuOnSelect={false}
						isSearchable={false}
						value={options.filter(c => value?.includes(c.value))}
						onChange={val => {
							onChange(val.map(c => c.value))
						}}
						onBlur={handleSubmit(onSubmit)}
						options={options}
						isMulti
						placeholder='Нажми'
					/>
				)}
			/>
		</form>
	)
}
