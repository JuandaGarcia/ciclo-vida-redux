import { combineReducers } from 'redux'
import UsuariosReducer from './UsuariosReducer'
import PublicacionesReducer from './PublicacionesReducer'
import TareasReducer from './TareasReducer'

export default combineReducers({
	UsuariosReducer,
	PublicacionesReducer,
	TareasReducer
})
