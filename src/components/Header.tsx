import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import AuthService from '../services/auth.service'
import { useUser } from '../hooks/currentUser'
import { Link } from 'react-router-dom'

export function Header() {
	const { currentUser } = useUser()
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const logOut = () => {
		AuthService.logout()
	}

	return (
		<>
			<Button variant='primary' onClick={handleShow} className='menu-button'>
				<i className='fi fi-sr-menu-burger'></i>
			</Button>
			<Offcanvas show={show} onHide={handleClose} placement='end'>
				<Offcanvas.Header closeButton>
					<img src='/images/logo-black.png' width='150' alt='logo' className='d-inline-block align-top' />
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ul className='menu'>
						{currentUser?.['roles'] !== 'ROLE_USER' &&
						currentUser?.['roles'] !== 'ROLE_USER_TFC' &&
						currentUser?.['roles'] !== 'ROLE_USER_WORKSHOPS' ? (
							<>
								<li>
									<Link to={`/price-services/`} onClick={handleClose}>
										Цены услуг
									</Link>
								</li>
								<li>
									<Link to={`/price-materials/`} onClick={handleClose}>
										Цены материалов
									</Link>
								</li>
								<li>
									<Link to={`/tariffs-rates/`} onClick={handleClose}>
										Тарифы и ставки
									</Link>
								</li>
								<li>
									<Link to={`/users/`} onClick={handleClose}>
										Управление пользователями
									</Link>
								</li>
								<li>
									<Link to={`/exemption-customers/`} onClick={handleClose}>
										Заказчики-исключения
									</Link>
								</li>
							</>
						) : (
							<></>
						)}
						{currentUser?.['roles'] !== 'ROLE_USER' && currentUser?.['roles'] !== 'ROLE_USER_TFC' ? (
							<>
								<li>
									<Link to={`/nomenclature/`} onClick={handleClose}>
										Номенклатура
									</Link>
								</li>
							</>
						) : (
							<></>
						)}
						<li>
							<a href={`/`} onClick={logOut}>
								Выйти
							</a>
						</li>
					</ul>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}
