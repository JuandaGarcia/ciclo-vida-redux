import React from 'react'
import { connect } from 'react-redux'
import * as UsuariosActions from '../../actions/UsuariosAction'

class Usuarios extends React.Component {
	componentDidMount() {
		this.props.traerTodos()
	}

	PonerFilas = () =>
		this.props.usuarios.map(usuario => (
			<tr key={usuario.id}>
				<td>{usuario.name}</td>
				<td>{usuario.email}</td>
				<td>{usuario.website}</td>
			</tr>
		))

	render() {
		return (
			<div>
				<table className="tabla">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Correo</th>
							<th>Enlace</th>
						</tr>
					</thead>
					<tbody>{this.PonerFilas()}</tbody>
				</table>
			</div>
		)
	}
}

const mapStateToProps = reducer => {
	return reducer.UsuariosReducer
}

export default connect(mapStateToProps, UsuariosActions)(Usuarios)
