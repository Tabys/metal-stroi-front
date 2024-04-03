export function getMetalNameSuffix(metal: string) {
	let metalName = ''
	switch (metal) {
		case 'St37':
			metalName = ''
			break
		case 'AlMg3':
			metalName = 'ал'
			break
		case '1.4301':
			metalName = 'нерж'
			break
	}

	return metalName
}
