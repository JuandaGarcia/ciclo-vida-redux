import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Menu from './menu'
import Usuarios from './usuarios'

const Tareas = () => <div>Tareas</div>

function App() {
	return (
		<BrowserRouter>
			<Menu />

			<div className="margen">
				<Route exact path="/" component={Usuarios} />
				<Route exact path="/tareas" component={Tareas} />
			</div>
		</BrowserRouter>
	)
}

export default App
