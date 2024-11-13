import { Link } from 'react-router-dom'
import { DocClient } from '../client/docClient'
import { DocOrder } from '../order/docOrder'
import { DocWorkhop } from '../workshop/docWorkshop'

export function GroupMainDocs() {
	return (
		<div className='container doc-container'>
			<Link to='..' relative='path' className='back-link'>
				Вернуться назад
			</Link>
			<DocClient />
			<div className='page_brake'></div>
			<DocOrder />
			<div className='page_brake'></div>
			<DocWorkhop />
		</div>
	)
}
