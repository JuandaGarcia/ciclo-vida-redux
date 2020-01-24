import React from 'react'
import { connect } from 'react-redux'
import * as TareasAction from '../../actions/TareasAction'
import Loader from '../general/Loader'
import Fatal from '../general/Fatal'
import { Link } from 'react-router-dom'

class Tareas extends React.Component {
	componentDidMount() {
		if (!Object.keys(this.props.tareas).length) {
			this.props.traerTodas()
		}
	}

	componentDidUpdate() {
		const { tareas, loading, traerTodas } = this.props

		if (!Object.keys(tareas).length && !loading) {
			traerTodas()
			console.log(this.props)
		}
	}

	mostrarContenido = () => {
		const { tareas, loading, error } = this.props

		if (loading) {
			return <Loader />
		}

		if (error) {
			return <Fatal message={error} />
		}

		return Object.keys(tareas).map(usu_id => (
			<div key={usu_id}>
				<h2>Usuario {usu_id}</h2>
				<div className="contenedor_tareas">{this.ponerTareas(usu_id)}</div>
			</div>
		))
	}

	ponerTareas = usu_id => {
		const { tareas, cambioCheck, eliminar } = this.props
		const porUsuario = {
			...tareas[usu_id]
		}
		return Object.keys(porUsuario).map(tarea_id => (
			<div key={tarea_id}>
				<input
					type="checkbox"
					defaultChecked={porUsuario[tarea_id].completed}
					onChange={() => cambioCheck(usu_id, tarea_id)}
				/>
				{porUsuario[tarea_id].title}
				<button className="m-left">
					<Link to={`/tareas/guardar/${usu_id}/${tarea_id}`}>Editar</Link>
				</button>
				<button
					onClick={() => {
						eliminar(tarea_id)
					}}
					className="m-left"
				>
					Eliminar
				</button>
			</div>
		))
	}

	render() {
		return (
			<div>
				<button>
					<Link to="/tareas/guardar">Agregar</Link>
				</button>
				{this.mostrarContenido()}
			</div>
		)
	}
}

const mapStateToProps = ({ TareasReducer }) => TareasReducer

export default connect(mapStateToProps, TareasAction)(Tareas)
