import { FaUpLong } from 'react-icons/fa6'
import ScrollToTop from 'react-scroll-to-top'

export function ScrollTop() {
	return <ScrollToTop smooth component={<FaUpLong />} className='scrollTop' />
}
