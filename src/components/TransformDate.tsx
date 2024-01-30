type DateNull = Date | null
type StringNull = string | null
type TransDateProps = {
	orderDate: string | undefined
}

export function TransformDate({ orderDate }: TransDateProps) {
	const oldDate: DateNull = orderDate ? new Date(orderDate) : null
	const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	const customDate: StringNull = oldDate
		? ('0' + oldDate.getDate()).slice(-2) +
		  '.' +
		  ('0' + month[Number(oldDate.getMonth())]).slice(-2) +
		  '.' +
		  oldDate.getFullYear()
		: null

	return <>{customDate}</>
}
