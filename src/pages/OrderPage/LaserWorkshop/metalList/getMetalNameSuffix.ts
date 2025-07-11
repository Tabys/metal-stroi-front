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
			metalName = 'нерж пищ мат'
			break
		case 'aisi304_BA':
			metalName = 'нерж пищ зерк'
			break
		case 'aisi304_4N':
			metalName = 'нерж пищ шлиф'
			break
		case 'aisi430_2B':
			metalName = 'нерж тех мат'
			break
		case 'aisi430_BA':
			metalName = 'нерж тех зерк'
			break
		case 'aisi430_4N':
			metalName = 'нерж тех шлиф'
			break
		case '09Г2С':
			metalName = 'ГС'
			break
		case 'ОЦ':
			metalName = 'ОЦ'
			break
		default:
			metalName = metal
			break
	}

	return metalName
}
