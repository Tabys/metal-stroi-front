import { Link } from 'react-router-dom'


export function DocClient() {

    return (
        <>
            <div className="container">
                <div className="row  g-2">
                    <Link to=".." relative="path">Вернуться назад</Link>
                    <h1>Документ Клиенту</h1>
                </div>

            </div>
        </>
    );
}
