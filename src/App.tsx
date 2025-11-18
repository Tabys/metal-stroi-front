import { Route, Routes } from 'react-router-dom'
import { OrderPage } from './pages/OrderPage/index'
import { OrdersPage } from './pages/OrderList/index'
import { Page404 } from './pages/Page404/index'
import { PriceServices } from './pages/PriceServices'
import { PriceMaterials } from './pages/PriceMaterials'
import { Header } from './components/Header'
import { LogIn } from './components/auth/Login'
import { AuthVerify } from './common/AuthVerify'
import { UsersPage } from './pages/Users'
import { useUser } from './hooks/currentUser'
import { DocPainting } from './pages/OrderPage/LaserWorkshop/documents/painting/docPainting'
import { DocSpecialization } from './pages/OrderPage/LaserWorkshop/documents/specialization/docSpecialization'
import { ExemptionCustomers } from './pages/ExemptionCustomers'
import { ScrollTop } from './components/ScrollTop'
import { TariffsAndRates } from './pages/Tariffs'
import { DocPaintingWorkshops } from './pages/OrderPage/MKCMXKWorkshop/documents/painting/DocPainitngWorkshops'
import { Nomenclature } from './pages/Nomenclature'
import { StaticData } from './pages/StaticData'
import { DocWorkhop } from './pages/OrderPage/LaserWorkshop/documents/workshop/docWorkshop'
import { DocClient } from './pages/OrderPage/LaserWorkshop/documents/client/docClient'

function App() {
	const { currentUser } = useUser()

	return (
		<>
			<AuthVerify />
			{currentUser ? (
				<>
					<Header />
					<ScrollTop></ScrollTop>
					<Routes>
						<Route path='/' element={<OrdersPage />} />
						<Route path='/order/:id' element={<OrderPage />} />
						{/* <Route path='/order/:id/group-docs' element={<GroupMainDocs />} /> */}
						<Route path='/order/:id/doc-client' element={<DocClient />} />
						<Route path='/order/:id/doc-workshop' element={<DocWorkhop />} />
						{/* <Route path='/order/:id/doc-order' element={<DocOrder />} /> */}
						<Route path='/order/:id/doc-painting' element={<DocPainting />} />
						<Route path='/order/:id/doc-painting-wh' element={<DocPaintingWorkshops />} />
						<Route path='/order/:id/doc-specialization' element={<DocSpecialization />} />
						{/* <Route path='/order/:id/doc-contract' element={<DocContract />} /> */}
						{currentUser?.['roles'] !== 'ROLE_USER' &&
						currentUser?.['roles'] !== 'ROLE_USER_TFC' &&
						currentUser?.['roles'] !== 'ROLE_USER_WORKSHOPS' ? (
							<>
								<Route path='/price-services/' element={<PriceServices />} />
								<Route path='/price-materials/' element={<PriceMaterials />} />
								<Route path='/exemption-customers/' element={<ExemptionCustomers />} />
								<Route path='/tariffs-rates/' element={<TariffsAndRates />} />
								<Route path='/users' element={<UsersPage />} />
								<Route path='/static-data/' element={<StaticData />} />
							</>
						) : (
							''
						)}

						{currentUser?.['roles'] !== 'ROLE_USER' && currentUser?.['roles'] !== 'ROLE_USER_TFC' ? (
							<>
								<Route path='/nomenclature' element={<Nomenclature />} />
							</>
						) : (
							''
						)}

						<Route path='*' element={<Page404 />} />
					</Routes>
				</>
			) : (
				<>
					<Routes>
						<Route path='/' element={<LogIn />} />
						{/* <Route path='/order/:id/doc-contract' element={<DocContract />} /> */}
						<Route path='*' element={<Page404 />} />
					</Routes>
				</>
			)}
		</>
	)
}

export default App
