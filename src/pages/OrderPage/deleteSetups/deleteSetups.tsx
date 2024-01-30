import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { Order } from '../../../models'

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
			<Button className='fixed' variant='primary' onClick={sumbitHandler}>
				Удалить сетапы
			</Button>
		</>
	)
}
