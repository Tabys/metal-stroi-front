import { Spinner, Tab, Tabs } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TariffsAndRatesTable } from './TariffsAndRatesTable'
import { useTariffsAndRates } from '../../hooks/useTariffsAndRates'

export function TariffsAndRates() {
	const { rates, loading } = useTariffsAndRates()
	return (
		<>
			<div id='container' className='container'>
				<div className='row g-2 mb-3'>
					<Link to={`/`} className='back-link'>
						На главную
					</Link>
					<h1>Тарифы и ставки</h1>
				</div>

				{loading ? (
					<Spinner animation='border' />
				) : (
					<Tabs defaultActiveKey='tariff' className='mb-3'>
						{rates.map((rate, index) => (
							<Tab eventKey={rate.id} key={index} title={rate.name}>
								<TariffsAndRatesTable ratesItems={rate.price_rates_items} />
							</Tab>
						))}
					</Tabs>
				)}
			</div>
		</>
	)
}
