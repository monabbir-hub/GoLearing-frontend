import { http, http2 } from '../lib/axios'

export const UPLOAD_FILE = (files) => {
	const formData = new FormData()
	for (const file of files) {
		formData.append('photo', file)
	}

	return http({
		method: 'POST',
		data: formData,
		url: '/file/upload',
	})
}

export const GET_STATIC = ({ queryKey }) => {
	const [_, args] = queryKey
	return http2({
		method: 'GET',
		params: args,
		url: '/static/get',
	})
}

export const GET_ADMIN_STATIC = ({ queryKey }) => {
	const [_, args] = queryKey
	return http({
		method: 'GET',
		params: args,
		url: '/static/admin_get',
	})
}

export const UPDATE_STATIC = (values) => {
	return http({
		method: 'PUT',
		data: values,
		url: '/static/edit',
	})
}
