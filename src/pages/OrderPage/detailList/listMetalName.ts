export function listMetalName(material: string | undefined) {
	let listMetal: string[] = []
	switch (material) {
		case 'St37':
			listMetal = ['Hardox', 'Magstrong', 'ОЦ', 'ГС']
			break
		case 'AlMg3':
			listMetal = [
				'пищ',
				'тех',
				'мат',
				'шлиф',
				'в плёнке',
				'без плёнки',
				'зерк',
			]
			break
		case '1.4301':
			listMetal = ['']
			break
	}
	return listMetal
}
