import { Button } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaArrowsRotate } from 'react-icons/fa6'
import { Order, UpdBX24 } from '../../../models'
import axios from 'axios'
import Tooltip from '../../../components/Tooltip'

type UpdBX24DataProps = {
	order: Order | null
	onUpd: () => void
}

export function UpdBX24Data({ order, onUpd }: UpdBX24DataProps) {
	const { handleSubmit } = useForm<UpdBX24>()

	const onSubmit: SubmitHandler<UpdBX24> = async data => {
		await axios.post<UpdBX24>(
			process.env.REACT_APP_BACKEND_API_URL + 'import',
			{
				id: order?.id,
			}
		)
		await onUpd()
	}

	return (
		<>
			<Tooltip conditions={true} text='Акутализировать данные из BX24'>
				<Button
					className='fixed right-175'
					variant='primary'
					onClick={handleSubmit(onSubmit)}
				>
					<FaArrowsRotate />
				</Button>
			</Tooltip>
		</>
	)
}
