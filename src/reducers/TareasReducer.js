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

const INITIAL_STATE = {
	tareas: {},
	loading: false,
	error: null,
	user_id: '',
	titulo: '',
	regresar: false
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TRAER_TODAS:
			return {
				...state,
				regresar: false,
				tareas: action.payload,
				loading: false,
				error: null
			}
		case LOADING:
			return { ...state, loading: true }
		case ERROR:
			return { ...state, error: action.payload, loading: false }
		case CAMBIO_USUARIO:
			return { ...state, user_id: action.payload }
		case CAMBIO_TITULO:
			return { ...state, titulo: action.payload }
		case ACTUALIZAR:
			return { ...state, tareas: action.payload }
		case LIMPIAR:
			return { ...state, titulo: '', user_id: '' }
		case GUARDAR:
			return {
				...state,
				tareas: {},
				loading: false,
				error: null,
				regresar: true,
				user_id: '',
				titulo: ''
			}
		default:
			return state
	}
}
