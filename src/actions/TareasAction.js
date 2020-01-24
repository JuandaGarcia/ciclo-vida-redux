import axios from 'axios'
import {
	TRAER_TODAS,
	LOADING,
	ERROR,
	CAMBIO_USUARIO,
	CAMBIO_TITULO,
	GUARDAR,
	ACTUALIZAR,
	LIMPIAR
} from '../types/TareasTypes'

export const traerTodas = () => async dispatch => {
	dispatch({
		type: LOADING
	})

	try {
		const respuesta = await axios.get(
			'https://jsonplaceholder.typicode.com/todos'
		)

		const tareas = {}
		respuesta.data.map(
			tar =>
				(tareas[tar.userId] = {
					...tareas[tar.userId],
					[tar.id]: {
						...tar
					}
				})
		)

		dispatch({
			type: TRAER_TODAS,
			payload: tareas
		})
	} catch (error) {
		console.log('Error: ' + error.message)
		dispatch({
			type: ERROR,
			payload: 'Información de tareas no disponible'
		})
	}
}

export const cambioUsuarioId = number => dispatch => {
	dispatch({
		type: CAMBIO_USUARIO,
		payload: number
	})
}
export const cambioTitulo = titulo => dispatch => {
	dispatch({
		type: CAMBIO_TITULO,
		payload: titulo
	})
}

export const agregar = nueva_tarea => async dispatch => {
	dispatch({
		type: LOADING
	})
	try {
		const respuesta = await axios.post(
			'https://jsonplaceholder.typicode.com/todos',
			nueva_tarea
		)
		dispatch({
			type: GUARDAR
		})
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: 'Intente mas tarde'
		})
	}
}

export const editar = tarea_editada => async dispatch => {
	dispatch({
		type: LOADING
	})
	try {
		const respuesta = await axios.put(
			`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`,
			tarea_editada
		)
		dispatch({
			type: GUARDAR
		})
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: 'Intente mas tarde'
		})
	}
}

export const cambioCheck = (usu_id, tarea_id) => (dispatch, getState) => {
	const { tareas } = getState().TareasReducer
	const seleccionada = tareas[usu_id][tarea_id]

	const actualizadas = {
		...tareas
	}
	actualizadas[usu_id] = {
		...tareas[usu_id]
	}

	actualizadas[usu_id][tarea_id] = {
		...tareas[usu_id][tarea_id],
		completed: !seleccionada.completed
	}

	dispatch({
		type: ACTUALIZAR,
		payload: actualizadas
	})
}

export const eliminar = tar_id => async dispatch => {
	dispatch({
		type: LOADING
	})
	try {
		const respuesta = await axios.delete(
			`https://jsonplaceholder.typicode.com/todos/${tar_id.id}`
		)
		dispatch({
			type: TRAER_TODAS,
			payload: ''
		})
	} catch (error) {
		dispatch({
			type: ERROR,
			payload: 'servicio no dispnible'
		})
	}
}

export const limpiarForma = () => dispatch => {
	dispatch({
		type: LIMPIAR
	})
}
