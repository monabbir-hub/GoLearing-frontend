import { http } from '../lib/axios'

export const GET_VIDEO_VIMEO = ({ queryKey }) => {
	const [_, args] = queryKey
	return http({
		method: 'GET',
		params: args,
		url: '/video/get_vimeo',
	})
}
