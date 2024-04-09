import { Detail, Order } from '../../../../../models'

type getSuffixesProps = {
	order: Order | undefined
	detail: Detail
}

export function getSuffixes({ order, detail }: getSuffixesProps) {
	const actualSetup = order?.setups?.find(
		setup => Number(setup.id) === detail.setup_id
	)
	let suffixes: string[] = []
	actualSetup?.suffixes?.forEach(suffix => {
		const stringSuffix = JSON.stringify(suffix)
		const objectSuffix = JSON.parse(stringSuffix)
		suffixes.push(objectSuffix.value)
		suffixes.sort((a, b) => a.localeCompare(b))
	})
	const strSuffixes = suffixes.join(', ')

	return strSuffixes
}
