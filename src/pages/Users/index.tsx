import { Link } from 'react-router-dom'
import { AddUserForm } from './components/create/AddUserForm'
import { Tab } from 'react-bootstrap'
import { Tabs } from 'react-bootstrap'
import { UsersTable } from './components/edite/UsersTable'

export function UsersPage() {
	return (
		<div id='container' className='container'>
			<div className='row g-2 mb-3'>
				<Link to={`/`} className='back-link'>
					На главную
				</Link>
				<h1>Пользователи</h1>
			</div>
			<Tabs defaultActiveKey='edit' className='mb-3'>
				<Tab eventKey='edit' title='Управление'>
					<UsersTable />
				</Tab>
				<Tab eventKey='create' title='Создание'>
					<AddUserForm />
				</Tab>
			</Tabs>
		</div>
	)
}
