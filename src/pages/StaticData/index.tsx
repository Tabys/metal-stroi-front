import { Link } from 'react-router-dom'
import { StaticDataWrapper } from './StaticDataWrapper'

export function StaticData() {
	return (
		<>
			<div id='container' className='container'>
				<div className='row g-2 mb-3'>
					<Link to={`/`} className='back-link'>
						На главную
					</Link>
					<h1>Статические данные</h1>
				</div>

				<StaticDataWrapper />
			</div>
		</>
	)
}
