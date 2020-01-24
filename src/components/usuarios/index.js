import React from 'react'
import { connect } from 'react-redux'
import * as UsuariosActions from '../../actions/UsuariosAction'
import Loader from '../general/Loader'
import Fatal from '../general/Fatal'
import Tabla from './Tabla'

class Usuarios extends React.Component {
	componentDidMount() {
		if (!this.props.usuarios.length) {
			this.props.traerTodos()
		}
	}

	PonerContenido = () => {
		if (this.props.loading) {
			return <Loader />
		}
		if (this.props.error) {
			return <Fatal message={this.props.error} />
		}
		return <Tabla />
	}

	render() {
		return (
			<div>
				<h1>Usuarios</h1> <br /> {this.PonerContenido()}
			</div>
		)
	}
}

const mapStateToProps = reducer => {
	return reducer.UsuariosReducer
}

export default connect(mapStateToProps, UsuariosActions)(Usuarios)
