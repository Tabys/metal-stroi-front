export function listMetalName(material: string | undefined) {
	let listMetal: string[] = []
	switch (material) {
		case 'St37':
			listMetal = ['Hardox', 'Magstrong']
			break
		case 'St37HK':
			listMetal = ['Hardox', 'Magstrong']
			break
		case 'St37RIF':
			listMetal = ['Hardox', 'Magstrong']
			break
		case '09Г2С':
			listMetal = []
			break
		case 'AlMg3':
			listMetal = []
			break
		case '1.4301':
			listMetal = ['в плёнке', 'без плёнки']
			break
		case 'aisi304':
			listMetal = ['в плёнке', 'без плёнки']
			break
		case 'aisi304_2B':
			listMetal = ['в плёнке', 'без плёнки']
			break
		case 'aisi304_BA':
			listMetal = ['в плёнке', 'без плёнки']
			break
		case 'aisi304_4N':
			listMetal = ['в плёнке', 'без плёнки']
			break
		case 'aisi430_2B':
			listMetal = ['в плёнке', 'без плёнки']
			break
		case 'aisi430_BA':
			listMetal = ['в плёнке', 'без плёнки']
			break
		case 'aisi430_4N':
			listMetal = ['в плёнке', 'без плёнки']
			break
		case 'ОЦ':
			listMetal = []
			break
	}
	return listMetal
}
