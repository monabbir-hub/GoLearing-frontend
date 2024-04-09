export default function QueryState({ status, error, children }) {
	if (status === 'loading')
		return (
			<div className='py-3 w-100'>
				<p>Loading...</p>
			</div>
		)
	if (error) return <p>Error: {error?.response?.data?.msg || error.message}</p>
	return children
}
