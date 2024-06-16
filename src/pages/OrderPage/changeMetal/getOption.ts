import { Setup } from '../../../models'
type Option = {
	value: string[]
	text: string[]
}

export function getOption(setup: Setup) {
	let listMetal: Option = {
		value: [],
		text: [],
	}
	switch (setup.material) {
		case 'St37':
			listMetal = {
				value: ['St37', '1.4301', '09Г2С'],
				text: ['Ст37', 'Нерж', '09Г2С'],
			}
			break
		case '09Г2С':
			listMetal = {
				value: ['St37', '1.4301', '09Г2С'],
				text: ['Ст37', 'Нерж', '09Г2С'],
			}
			break
		case 'AlMg3':
			listMetal = {
				value: ['St37', '1.4301', '09Г2С'],
				text: ['Ст37', 'Нерж', '09Г2С'],
			}
			break
		case '1.4301':
			listMetal = {
				value: ['1.4301', 'aisi430'],
				text: ['Нерж. (тех)', 'Нерж. (пищ)'],
			}
			break
		case 'aisi430':
			listMetal = {
				value: ['1.4301', 'aisi430'],
				text: ['Нерж. (тех)', 'Нерж. (пищ)'],
			}
			break
	}
	return listMetal
}
