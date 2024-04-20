export function getMaterialName(table: string | undefined) {
	let material = ''
	switch (table) {
		case 'St37':
			material = ' '
			break
		case '1.4301':
			material = 'нерж '
			break
		case 'AlMg3':
			material = 'ал '
			break
	}
	return material
}
