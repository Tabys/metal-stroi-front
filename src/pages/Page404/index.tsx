import { Link } from 'react-router-dom'
export function Page404() {


    return (
        <>
            <h1>404</h1>
            <p>Такой страницы не существует</p>
            <Link to="/" className="back-link">Вернуться на главную</Link>
        </>
    );
}
