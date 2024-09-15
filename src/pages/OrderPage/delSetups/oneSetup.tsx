import { SubmitHandler, useForm } from 'react-hook-form'
import { Setup } from '../../../models'
import { OneDetail } from './oneDetail'
import style from './style.module.css'
import axios from 'axios'
import { FaRegTrashCan } from 'react-icons/fa6'

type OneSetupProps = {
	setup: Setup
	onDel: () => void
}

export function OneSetup({ setup, onDel }: OneSetupProps) {
	const { register, handleSubmit } = useForm<Setup>()

	const onSubmit: SubmitHandler<Setup> = async data => {
		await axios.delete<Setup>(
			process.env.REACT_APP_BACKEND_API_URL + `setup/`,
			{ data: { id: setup.id, order_id: setup.order_id } }
		)
		await onDel()
	}

	return (
		<form className={style.setup} onSubmit={handleSubmit(onSubmit)}>
			<input type='hidden' {...register('id')} defaultValue={setup.id} />
			<div className={style.title}>
				<div className={style.group}>
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
				<button type='submit' className='btn btn-link container-fluid'>
					<FaRegTrashCan />
				</button>
			</div>
			<div className={style.details}>
				{setup.details?.map(detail => (
					<OneDetail key={detail.id} detail={detail} />
				))}
				<div className={style.detail + ' ' + style.empty}></div>
			</div>
		</form>
	)
}
