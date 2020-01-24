import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function Tabla(props) {
	const PonerFilas = () =>
		props.usuarios.map((usuario, key) => (
			<tr key={usuario.id}>
				<td>{usuario.name}</td>
				<td>{usuario.email}</td>
				<td>{usuario.website}</td>
				<td>
					<Link to={`/publicaciones/${key}`}>
						<div className="eye-solid3 icon"></div>
					</Link>
				</td>
			</tr>
		))

	return (
		<table className="tabla">
			<thead>
				<tr>
					<th>Nombre</th>
					<th>Correo</th>
					<th>Enlace</th>
				</tr>
			</thead>
			<tbody>{PonerFilas()}</tbody>
		</table>
	)
}

const mapStateToProps = reducer => {
	return reducer.UsuariosReducer
}

export default connect(mapStateToProps)(Tabla)
