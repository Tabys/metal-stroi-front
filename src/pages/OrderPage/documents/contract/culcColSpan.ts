import { TotalData } from '../../../../models'

export function CulcColSpan(total: TotalData) {
	let count = 6

	if (Number(total.cuting_laser) > 0 || Number(total.cuting_plasma) > 0) {
	} else {
		count -= 1
	}

	if (Number(total.choping) > 0) {
	} else {
		count -= 1
	}

	if (Number(total.bending) > 0) {
	} else {
		count -= 1
	}

	if (Number(total.prod_painting) > 0) {
	} else {
		count -= 1
	}

	if (Number(total.prod_turning_works) > 0) {
	} else {
		count -= 1
	}

	return count
}
