export function renameMetal(materialName: string | undefined) {
	let material = ''
	switch (materialName) {
		case 'St37':
			material = 'Ст3'
			break
		case '1.4301':
			material = 'aisi304_2B'
			break
		default:
			material = materialName || ''
			break
	}
	return material
}
