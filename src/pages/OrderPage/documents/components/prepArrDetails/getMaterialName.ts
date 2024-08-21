export function getMaterialName(table: string | undefined) {
	let material = ''
	switch (table) {
		case 'St37':
			material = ''
			break
		case 'AlMg3':
			material = 'ал'
			break
		case '1.4301':
			material = 'нерж'
			break
		case 'aisi430':
			material = 'нерж пищ'
			break
		case '09Г2С':
			material = 'ГС'
			break
	}
	return material
}
