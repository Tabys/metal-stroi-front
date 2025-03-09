import { Detail, Order } from '../../../../../../models'

type getSuffixesProps = {
	order: Order | undefined
	detail: Detail
}

export function getSuffixes({ order, detail }: getSuffixesProps) {
	const actualSetup = order?.setups?.find(setup => {
		const setup_id = detail.setup_detail ? detail.setup_detail.setup_id : detail.setups?.[0].id
		return Number(setup.id) === setup_id
	})
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
