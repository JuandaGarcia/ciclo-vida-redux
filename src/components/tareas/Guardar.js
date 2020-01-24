import React from 'react'
import { connect } from 'react-redux'
import * as TareasAction from '../../actions/TareasAction'
import Loader from '../general/Loader'
import Fatal from '../general/Fatal'
import { Redirect } from 'react-router-dom'

class Guardar extends React.Component {
	componentDidMount() {
		const {
			match: {
				params: { usu_id, tar_id }
			},
			tareas,
			cambioUsuarioId,
			cambioTitulo,
			limpiarForma
		} = this.props

		if (usu_id && tar_id) {
			const tarea = tareas[usu_id][tar_id]
			cambioUsuarioId(tarea.userId)
			cambioTitulo(tarea.title)
		} else {
			limpiarForma()
		}
	}

	cambioUsuarioId = event => {
		this.props.cambioUsuarioId(event.target.value)
	}
	cambioTitulo = event => {
		this.props.cambioTitulo(event.target.value)
	}

	guardar = () => {
		const {
			user_id,
			titulo,
			agregar,
			match: {
				params: { usu_id, tar_id }
			},
			editar,
			tareas
		} = this.props
		const nueva_tarea = {
			user_id: user_id,
			titulo: titulo,
			completed: false
		}

		if (usu_id && tar_id) {
			const tarea = tareas[usu_id][tar_id]
			const tareaEditada = {
				...nueva_tarea,
				completed: tarea.completed,
				id: tarea.id
			}
			editar(tareaEditada)
		} else {
			agregar(nueva_tarea)
		}
	}

	deshabilitar = () => {
		const { titulo, user_id, loading } = this.props
		if (loading) {
			return true
		}
		if (!user_id || !titulo) {
			return true
		}
		return false
	}

	mostrarAction = () => {
		const { error, loading } = this.props
		if (loading) {
			return <Loader />
		}
		if (error) {
			return <Fatal message={error} />
		}
	}

	render() {
		return (
			<div>
				{this.props.regresar ? <Redirect to="/tareas" /> : ''}
				<h1>Guardar tareas</h1>
				Usuario Id:
				<input
					type="number"
					value={this.props.user_id}
					onChange={this.cambioUsuarioId}
				/>
				<br />
				<br />
				Titulo:
				<input
					type="text"
					value={this.props.titulo}
					onChange={this.cambioTitulo}
				/>
				<br />
				<br />
				<button disabled={this.deshabilitar()} onClick={this.guardar}>
					Guardar
				</button>
				{this.mostrarAction()}
			</div>
		)
	}
}

const mapStateToProps = ({ TareasReducer }) => TareasReducer

export default connect(mapStateToProps, TareasAction)(Guardar)
