export function getMetalNameSuffix(metal: string) {
	let metalName = ''
	switch (metal) {
		case 'St37':
			metalName = 'Ст3'
			break
		case 'St37HK':
			metalName = 'Ст3 х/к'
			break
		case 'St37RIF':
			metalName = 'Ст3 риф'
			break
		case 'AlMg3':
			metalName = 'ал'
			break
		case '1.4301':
			metalName = 'нерж'
			break
		case 'aisi430':
			metalName = 'нерж пищ'
			break
		case '09Г2С':
			metalName = 'ГС'
			break
		case 'ОЦ':
			metalName = 'ОЦ'
			break
	}

	return metalName
}
