import axios from 'axios'
import { ACTUALIZAR, LOADING, ERROR } from '../types/PublicacionesTypes'
import * as UsuariosTypes from '../types/UsuariosTypes'

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = UsuariosTypes

export const traerPorUsusario = key => async (dispatch, getState) => {
	dispatch({
		type: LOADING
	})

	const { usuarios } = getState().UsuariosReducer
	const { publicaciones } = getState().PublicacionesReducer
	const user_id = usuarios[key].id

	try {
		const respuesta = await axios.get(
			`http://jsonplaceholder.typicode.com/posts?userId=${user_id}`
		)

		const nuevas = respuesta.data.map(publicacion => ({
			...publicacion,
			comentarios: [],
			abierto: false
		}))

		const publicaciones_actualizadas = [...publicaciones, nuevas]

		dispatch({
			type: ACTUALIZAR,
			payload: publicaciones_actualizadas
		})

		const publicaciones_key = publicaciones_actualizadas.length - 1
		const usuarios_actualizados = [...usuarios]
		usuarios_actualizados[key] = {
			...usuarios[key],
			publicaciones_key
		}

		dispatch({
			type: USUARIOS_TRAER_TODOS,
			payload: usuarios_actualizados
		})
	} catch (error) {
		console.log(error.message)
		dispatch({
			type: ERROR,
			payload: 'Publicaciones no disponibles'
		})
	}
}

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
	const { publicaciones } = getState().PublicacionesReducer
	const seleccionada = publicaciones[pub_key][com_key]

	const actualizada = {
		...seleccionada,
		abierto: !seleccionada.abierto
	}

	const publicaciones_actualizadas = [...publicaciones]
	publicaciones_actualizadas[pub_key] = [...publicaciones[pub_key]]
	publicaciones_actualizadas[pub_key][com_key] = actualizada

	dispatch({
		type: ACTUALIZAR,
		payload: publicaciones_actualizadas
	})
}

export const traerComentarios = (pub_key, com_key) => async (
	dispatch,
	getState
) => {
	const { publicaciones } = getState().PublicacionesReducer
	const seleccionada = publicaciones[pub_key][com_key]

	const respuesta = await axios.get(
		`http://jsonplaceholder.typicode.com/comments?postId=${seleccionada}`
	)

	const actualizada = {
		...seleccionada,
		comentarios: respuesta.data
	}
	const publicaciones_actualizadas = [...publicaciones]
	publicaciones_actualizadas[pub_key] = [...publicaciones[pub_key]]
	publicaciones_actualizadas[pub_key][com_key] = actualizada

	dispatch({
		type: ACTUALIZAR,
		payload: publicaciones_actualizadas
	})
}
