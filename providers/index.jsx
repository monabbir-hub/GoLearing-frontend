import { QueryClientProvider } from 'react-query'
import { queryClient } from '../lib/queryClient'

export default function providers({ children }) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
