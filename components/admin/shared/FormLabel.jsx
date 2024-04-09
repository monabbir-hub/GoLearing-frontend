export default function FormLabel({ label, children }) {
	return (
		<label className='adminFormLabel'>
			<span>{label}</span>
			{children}
		</label>
	)
}
