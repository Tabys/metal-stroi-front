import { Link } from 'react-router-dom'
import { AddUserForm } from './components/AddUserForm'

export function UsersPage() {
	return (
		<div id='container' className='container'>
			<div className='row g-2 mb-3'>
				<Link to={`/`} className='back-link'>
					На главную
				</Link>
				<h1>Создание пользователя</h1>
			</div>
			<AddUserForm />
		</div>
	)
}
