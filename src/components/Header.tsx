import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import AuthService from '../services/auth.service'
import { useUser } from '../hooks/curentUser'

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
			<Button
				variant='primary'
				onClick={handleShow}
				className='menu-button'
			>
				Меню
			</Button>
			<Offcanvas show={show} onHide={handleClose}>
				<Offcanvas.Header closeButton>
					<img
						src='/images/logo-black.png'
						width='150'
						alt='logo'
						className='d-inline-block align-top'
					/>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ul className='menu'>
						{currentUser?.['roles'] !== 'ROLE_USER' ? (
							<>
								<li>
									<a href={`/price-services/`}>Цены услуг</a>
								</li>
								<li>
									<a href={`/price-materials/`}>
										Цены материалов
									</a>
								</li>
								<li>
									<a href={`/users/`}>Создать пользователя</a>
								</li>
							</>
						) : (
							<></>
						)}
						<li>
							<a href={`/`} onClick={logOut}>
								Выйт
							</a>
						</li>
					</ul>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}
