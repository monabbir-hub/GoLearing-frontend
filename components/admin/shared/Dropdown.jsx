import { useState } from 'react'
import useOutsideClick from '../../../hooks/useOutsideClick'

export default function Dropdown({ children, optionsElement }) {
	const [show, setShow] = useState(false)
	const { el } = useOutsideClick(() => setShow(false))

	return (
		<div className='adminDropdown' ref={el}>
			<div
				className='adminDropdown__trigger'
				onClick={() => setShow((value) => !value)}
			>
				{children}
			</div>
			<div className={`adminDropdown__options ${show ? 'active' : ''}`}>
				{optionsElement}
			</div>
		</div>
	)
}
