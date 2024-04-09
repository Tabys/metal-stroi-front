import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import AuthService from '../services/auth.service'
import { useUser } from '../hooks/curentUser'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa6'

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
				<FaBars />
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
									<Link
										to={`/price-services/`}
										onClick={handleClose}
									>
										Цены услуг
									</Link>
								</li>
								<li>
									<Link
										to={`/price-materials/`}
										onClick={handleClose}
									>
										Цены материалов
									</Link>
								</li>
								<li>
									<Link to={`/users/`} onClick={handleClose}>
										Создать пользователя
									</Link>
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
