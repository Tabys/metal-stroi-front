import axios from 'axios'
import { Detail, MetalChange, Setup } from '../../../models'
import { FormSelect } from '../detailList/formElements/formSelect'
import { OneDetail } from './oneDetail'
import style from './style.module.css'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'

type OneSetupProps = {
	setup: Setup
	arrDetails: Detail[]
	onChange: () => void
}

export function OneSetup({ onChange, setup, arrDetails }: OneSetupProps) {
	const methods = useForm<MetalChange>()

	const onSubmit: SubmitHandler<MetalChange> = async data => {
		await axios.put<MetalChange>(
			process.env.REACT_APP_BACKEND_API_URL + 'setup/metal-types',
			data
		)
		await onChange()
	}

	const addDetails = arrDetails.filter(detail => {
		const setupIndexes = detail.additional_setups?.split(' ')
		const result = setupIndexes?.filter(index => {
			return Number(index) === Number(setup.order_index)
		})
		return result?.length
	})

	return (
		<FormProvider {...methods}>
			<form className={style.setup}>
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
							Мин. заготовка:{' '}
							<strong>{setup.min_work_piece}</strong>
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
							? setup.details[0].thickness
							: addDetails[0].thickness
					}
				/>
				<FormSelect
					arrOptions={['St37', '1.4301', '09Г2С']}
					arrOptionsText={['Ст37', 'Нерж', '09Г2С']}
					selected={setup.material}
					name='abbreviation'
					onSubmit={methods.handleSubmit(onSubmit)}
				/>
			</form>
		</FormProvider>
	)
}
