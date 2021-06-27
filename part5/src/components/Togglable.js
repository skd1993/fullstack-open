import React, {useState, useImperativeHandle} from 'react'

const Togglable = React.forwardRef((props, ref) => {
	const [visibility, setVisibility] = useState(false);

	const visibilityHandler = () => {
		setVisibility(prevState => !prevState);
	}

	useImperativeHandle(ref, () => {
		return {visibilityHandler}
	})

	return (
		<div>
			<button onClick={visibilityHandler} style={{display: visibility ? 'none' : ''}}>{props.buttonName}</button>
			<div style={{display: visibility ? '' : 'none'}}>
				{props.children}
				<button onClick={visibilityHandler}>{props.cancelButtonName}</button>
			</div>
		</div>
	)
})

export default Togglable