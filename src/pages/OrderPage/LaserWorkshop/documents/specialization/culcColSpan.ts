import { TotalData } from '../../../../../models'

export function CulcColSpan(total: TotalData) {
	let count = 8

	if (Number(total.cuting_plasma) > 0) {
	} else {
		count -= 1
	}

	if (Number(total.cuting_laser) > 0) {
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

	if (Number(total.painting) > 0) {
	} else {
		count -= 1
	}

	if (Number(total.rolling) > 0) {
	} else {
		count -= 1
	}

	if (Number(total.drowing) > 0) {
	} else {
		count -= 1
	}

	return count
}
