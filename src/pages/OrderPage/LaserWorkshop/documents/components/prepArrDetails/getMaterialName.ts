export function getMaterialName(table: string | undefined) {
	let material = ''
	switch (table) {
		case 'St37':
			material = ''
			break
		case 'St37HK':
			material = ''
			break
		case 'St37RIF':
			material = ''
			break
		case 'AlMg3':
			material = 'ал'
			break
		case '1.4301':
			material = 'нерж'
			break
		case 'aisi304':
			material = 'нерж пищ'
			break
		case 'aisi304_2B':
			material = 'нерж пищ мат'
			break
		case 'aisi304_BA':
			material = 'нерж пищ зерк'
			break
		case 'aisi304_4N':
			material = 'нерж пищ шлиф'
			break
		case 'aisi430_2B':
			material = 'нерж пищ мат'
			break
		case 'aisi430_BA':
			material = 'нерж пищ зерк'
			break
		case 'aisi430_4N':
			material = 'нерж пищ шлиф'
			break
		case '09Г2С':
			material = 'ГС'
			break
		case 'ОЦ':
			material = 'ОЦ'
			break
	}
	return material
}
