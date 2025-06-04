import { Alert, Button, Spinner, Table } from 'react-bootstrap'
import { useUsers } from '../../../../hooks/users'
import { FaRegTrashCan } from 'react-icons/fa6'
import apiClient from '../../../../components/apiClient'

export function UsersTable() {
	const { users, loading, error, fetchUsers } = useUsers()

	const handleDelete = async (id: number) => {
		await apiClient.delete(`users/${id}`).then(() => {
			fetchUsers()
		})
	}

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Логин</th>
							<th>Имя</th>
							<th>Фамилия</th>
							<th>Роль</th>
							<th>Удалить</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user.username}>
								<td>{user.username}</td>
								<td>{user.first_name}</td>
								<td>{user.last_name}</td>
								<td>{user.role_id}</td>
								<td>
									<Button onClick={() => handleDelete(user.id)}>
										<FaRegTrashCan />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}

			{error && <Alert variant='danger'>{error}</Alert>}
		</>
	)
}
