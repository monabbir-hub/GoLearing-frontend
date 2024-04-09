import ReactTooltip from 'react-tooltip'

export default function Tooltip({ children, message }) {
	return (
		<>
			<ReactTooltip />
			<span data-tip={message}>{children}</span>
		</>
	)
}
