import React from 'react'
import { connect } from 'react-redux'
import * as UsuariosActions from '../../actions/UsuariosAction'
import * as PublicacionesActions from '../../actions/PublicacionesAction'
import Loader from '../general/Loader'
import Fatal from '../general/Fatal'
import Comentarios from './Comentarios'

const { traerTodos: usuariosTraerTodos } = UsuariosActions
const {
	traerPorUsusario: publicacionesTraerPorUsusario,
	abrirCerrar,
	traerComentarios
} = PublicacionesActions

class Publicaciones extends React.Component {
	async componentDidMount() {
		const {
			usuariosTraerTodos,
			publicacionesTraerPorUsusario,
			match: {
				params: { key }
			}
		} = this.props
		if (!this.props.UsuariosReducer.usuarios.length) {
			await usuariosTraerTodos()
		}
		if (this.props.UsuariosReducer.error) {
			return
		}
		if (!('publicaciones_key' in this.props.UsuariosReducer.usuarios[key])) {
			publicacionesTraerPorUsusario(key)
		}
	}

	ponerUsuario = () => {
		const {
			UsuariosReducer,
			match: {
				params: { key }
			}
		} = this.props
		if (UsuariosReducer.error) {
			return <Fatal message={UsuariosReducer.error} />
		}
		if (!UsuariosReducer.usuarios.length || UsuariosReducer.loading) {
			return <Loader />
		}

		const nombre = UsuariosReducer.usuarios[key].name
		return <h1>Publicaciones de {nombre}</h1>
	}

	ponerPublicaciones = () => {
		const {
			UsuariosReducer,
			UsuariosReducer: { usuarios },
			PublicacionesReducer,
			PublicacionesReducer: { publicaciones },
			match: {
				params: { key }
			}
		} = this.props

		if (!usuarios.length) return
		if (UsuariosReducer.error) return
		if (PublicacionesReducer.loading) {
			return <Loader />
		}
		if (PublicacionesReducer.error) {
			return <Fatal message={PublicacionesReducer.error} />
		}
		if (!publicaciones.length) return
		if (!('publicaciones_key' in usuarios[key])) return

		const { publicaciones_key } = usuarios[key]

		return this.mostrarInfo(publicaciones[publicaciones_key], publicaciones_key)
	}

	mostrarInfo = (publicaciones, pub_key) =>
		publicaciones.map((publicacion, com_key) => {
			return (
				<div
					key={publicacion.id}
					className="pub_titulo"
					onClick={() => {
						this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)
					}}
				>
					<h2>{publicacion.title}</h2>
					<p>{publicacion.body}</p>
					{publicacion.abierto ? (
						<Comentarios comentarios={publicacion.comentarios} />
					) : (
						''
					)}
				</div>
			)
		})

	mostrarComentarios = (pub_key, com_key, comentarios) => {
		console.log(comentarios)
		this.props.abrirCerrar(pub_key, com_key)
		if (!comentarios.length) {
			this.props.traerComentarios(pub_key, com_key)
		}
	}

	render() {
		console.log(this.props)
		return (
			<div>
				{this.ponerUsuario()}
				{this.ponerPublicaciones()}
			</div>
		)
	}
}

const mapStateToProps = ({ UsuariosReducer, PublicacionesReducer }) => {
	return { UsuariosReducer, PublicacionesReducer }
}

const mapDispatchToProps = {
	usuariosTraerTodos,
	publicacionesTraerPorUsusario,
	abrirCerrar,
	traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)
