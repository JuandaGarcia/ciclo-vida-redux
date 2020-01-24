import React from 'react'
import '../../css/loader.css'

function Loader() {
	return (
		<div className="center">
			<div className="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Loader
