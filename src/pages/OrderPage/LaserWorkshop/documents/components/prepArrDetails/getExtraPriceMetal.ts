import { Order } from '../../../../../../models'

export function getExtraPriceMetal(order: Order | undefined) {
	let extraPriceMetal: number = 0
	switch (order?.markup) {
		case 2:
			extraPriceMetal = 0
			break
		case 3:
			extraPriceMetal = 0
			break
		case 4:
			extraPriceMetal = 0
			break
		case 5:
			extraPriceMetal = 0
			break
		case 6:
			extraPriceMetal = 0
			break
		case 7:
			extraPriceMetal = 100
			break
		case 8:
			extraPriceMetal = 100
			break
		case 9:
			extraPriceMetal = 100
			break
		case 10:
			extraPriceMetal = 150
			break
	}

	return extraPriceMetal
}
