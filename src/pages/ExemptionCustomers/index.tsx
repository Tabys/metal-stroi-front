import { Link } from 'react-router-dom'
import { ExeCustomersWrapper } from './exeCustomersWrapper'

export function ExemptionCustomers() {
	return (
		<>
			<div id='container' className='container'>
				<div className='row g-2 mb-3'>
					<Link to={`/`} className='back-link'>
						На главную
					</Link>
					<h1>Список заказчиков исключений</h1>
				</div>

				<ExeCustomersWrapper />
			</div>
		</>
	)
}
