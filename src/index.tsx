import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './custom.tema.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<BrowserRouter>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</BrowserRouter>
)
