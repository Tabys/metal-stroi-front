export function getMaterialName(table: string | undefined) {
	let material = ''
	switch (table) {
		case 'St37':
			material = ''
			break
		case 'St37HK':
			material = 'х/к'
			break
		case 'St37RIF':
			material = 'риф'
			break
		case 'Hardox':
			material = 'хард'
			break
		case 'Magstrong':
			material = 'маг'
			break
		case 'AlMg3':
			material = 'ал'
			break
		case '1.4301':
			material = 'нерж пищ мат'
			break
		case 'aisi304_BA':
			material = 'нерж пищ зерк'
			break
		case 'aisi304_4N':
			material = 'нерж пищ шлиф'
			break
		case 'aisi430_2B':
			material = 'нерж тех мат'
			break
		case 'aisi430_BA':
			material = 'нерж тех зерк'
			break
		case 'aisi430_4N':
			material = 'нерж тех шлиф'
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
