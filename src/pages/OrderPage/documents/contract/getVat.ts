import { Order } from '../../../../models'

export function getVat(orders: Order | undefined) {
	let vat: string = ''
	switch (orders?.vat) {
		case '222':
		case '224':
		case '226':
		case '316':
		case '326':
			vat = 'НДС не облагается'
			break
		case '228':
		case '472':
			vat = 'в т.ч. НДС'
			break
		case '':
			vat = ''
			break
	}
	return vat
}
