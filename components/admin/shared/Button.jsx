export default function Button({ children, size, type, variant, ...rest }) {
	return renderCurrentButton(rest, { variant, children, type, size })
}

function renderCurrentButton(buttonProps, options) {
	switch (options.variant) {
		case 'primary':
			return (
				<button
					type={options?.type || 'button'}
					className={`adminBtn primary ${options.size || ''}`}
					{...buttonProps}
				>
					{options.children}
				</button>
			)
		case 'secondary':
			return (
				<button
					type={options?.type || 'button'}
					className={`adminBtn secondary ${options.size || ''}`}
					{...buttonProps}
				>
					{options.children}
				</button>
			)
		default:
			return (
				<button
					type={options?.type || 'button'}
					className={`adminBtn primary ${options.size || ''}`}
					{...buttonProps}
				>
					{options.children}
				</button>
			)
	}
}
