import { FC, ReactElement } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltips from 'react-bootstrap/Tooltip'

type TooltipProps = {
	children: ReactElement
	conditions: boolean
	text: string | any
}

const Tooltip: FC<TooltipProps> = ({ children, conditions, text }) => {
	return (
		<OverlayTrigger overlay={conditions ? <Tooltips>{text}</Tooltips> : <></>} placement='auto'>
			{children}
		</OverlayTrigger>
	)
}

export default Tooltip
