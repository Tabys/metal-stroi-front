import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { Order } from '../../../models'
import { FaRegTrashCan } from 'react-icons/fa6'
import Tooltip from '../../../components/Tooltip'

interface deleteSetupsProps {
	onDel: (Order: Order) => void
	orderId: number
}

export function DeleteSetups({ onDel, orderId }: deleteSetupsProps) {
	const sumbitHandler = async (event: React.FormEvent) => {
		event.preventDefault()

		const response = await axios.delete<Order>(
			process.env.REACT_APP_BACKEND_API_URL + 'setup/',
			{ data: { id: orderId } }
		)
		onDel(response.data)
	}

	return (
		<>
			<Tooltip conditions={true} text='Удалить сетапы'>
				<Button variant='primary' onClick={sumbitHandler}>
					<FaRegTrashCan />
				</Button>
			</Tooltip>
		</>
	)
}
