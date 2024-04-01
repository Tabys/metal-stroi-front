import { Order } from '../../../../models'

export function extraPrice(orderData: Order) {
	let extraPriceMetal: number = 0
	switch (orderData.markup) {
		case 0:
			extraPriceMetal = 0
			break
		case 2:
			extraPriceMetal = 0
			break
		case 7:
			extraPriceMetal = 100
			break
		case 10:
			extraPriceMetal = 150
			break
	}
	return extraPriceMetal
}
