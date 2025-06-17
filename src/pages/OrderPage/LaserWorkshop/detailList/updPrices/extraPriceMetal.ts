export function extraPrice(markup: number) {
	let extraPriceMetal: number = 0
	switch (markup) {
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
