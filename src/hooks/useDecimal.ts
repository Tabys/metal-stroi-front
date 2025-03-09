import Decimal from 'decimal.js'

const EPSILON = new Decimal('1e-10') // Порог погрешности
const MIN_VALUE = new Decimal('0.01') // Минимум для округления

export const autoRound = (value: Decimal): Decimal => {
	const rounded = value.round()
	const diff = value.minus(rounded).abs()

	if (diff.lessThan(EPSILON) && value.greaterThan(MIN_VALUE)) {
		return rounded
	}

	return value
}
