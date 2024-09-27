import axios from 'axios'
import { Detail, MetalChange, MetalType, Setup } from '../../../models'
import { FormSelect } from '../detailList/formElements/formSelect'
import { OneDetail } from './oneDetail'
import style from './style.module.css'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { getOption } from './getOption'
import { useState } from 'react'

type OneSetupProps = {
	setup: Setup
	metals: MetalType[] | null
	openAlert: () => void
	onChange: () => void
}

export function OneSetup({
	onChange,
	openAlert,
	metals,
	setup,
}: OneSetupProps) {
	const options = getOption({ metals, setup })

	const methods = useForm<MetalChange>()
	const [defValue, setDefValue] = useState(setup.material)

	const onSubmit: SubmitHandler<MetalChange> = async data => {
		await axios.put<MetalChange>(
			process.env.REACT_APP_BACKEND_API_URL + 'setup/metal-types',
			data
		)
		await setDefValue(data.abbreviation)
		await onChange()
		await openAlert()
	}

	return (
		<FormProvider {...methods}>
			<form className={style.setup}>
				<div className={style.title}>
					<div className={style.top}>
						<p>
							<strong>{setup.material} </strong>
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
							Мин. заготовка:{' '}
							<strong>{setup.min_work_piece}</strong>
						</p>
					</div>
				</div>
				<div className={style.details}>
					{setup.details?.map(detail => (
						<OneDetail key={detail.id} detail={detail} />
					))}
					<div className={style.detail + ' ' + style.empty}></div>
				</div>
				<input
					{...methods.register('id')}
					type='hidden'
					defaultValue={setup.id}
				/>
				<input
					{...methods.register('order_id')}
					type='hidden'
					defaultValue={setup.order_id}
				/>
				<input
					{...methods.register('thickness')}
					type='hidden'
					defaultValue={
						setup.details
							? setup.details?.length > 0
								? setup.details[0]?.thickness
								: setup.work_piece?.split(' x ')[2]
							: setup.work_piece?.split(' x ')[2]
					}
				/>
				<FormSelect
					arrOptions={options.value ? options.value : []}
					arrOptionsText={options.text ? options.text : []}
					selected={defValue}
					name='abbreviation'
					onSubmit={methods.handleSubmit(onSubmit)}
				/>
			</form>
		</FormProvider>
	)
}
