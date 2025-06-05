import { FormatedSetupsData } from '../../../../models'

export function disableAzoteCheckboxes(setup: FormatedSetupsData | undefined) {
	let disable = true

	if (setup?.metals === '1.4301') {
		disable = false
	}

	return disable
}
