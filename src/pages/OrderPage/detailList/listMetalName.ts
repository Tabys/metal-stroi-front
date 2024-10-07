export function listMetalName(material: string | undefined) {
	let listMetal: string[] = []
	switch (material) {
		case 'St37':
			listMetal = ['Hardox', 'Magstrong', 'ГС']
			break
		case '09Г2С':
			listMetal = []
			break
		case 'AlMg3':
			listMetal = []
			break
		case '1.4301':
			listMetal = ['мат', 'шлиф', 'в плёнке', 'без плёнки', 'зерк']
			break
		case 'aisi430':
			listMetal = ['мат', 'шлиф', 'в плёнке', 'без плёнки', 'зерк']
			break
		case 'ОЦ':
			listMetal = []
			break
	}
	return listMetal
}
