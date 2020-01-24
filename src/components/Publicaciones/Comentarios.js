import React from 'react'

const Comentarios = props => {
	const ponerComentarios = () =>
		props.comentarios.map(comentario => (
			<li key={comentario.id}>
				<b>
					<u>{comentario.email}</u>
				</b>
				<br />
				{comentario.body}
			</li>
		))

	return <ul>{ponerComentarios()}</ul>
}

export default Comentarios
