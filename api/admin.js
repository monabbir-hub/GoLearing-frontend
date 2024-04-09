import { http } from '../lib/axios'

export const GET_ADMINS = ({ queryKey }) => {
	const [_, args] = queryKey
	return http({
		method: 'GET',
		params: args,
		url: '/admin/get',
	})
}

export const CREATE_ADMIN = (values) => {
	return http({
		method: 'POST',
		data: values,
		url: '/admin/create',
	})
}

export const UPDATE_ADMIN = (values) => {
	return http({
		method: 'PUT',
		data: values,
		url: '/admin/edit',
	})
}

export const DELETE_ADMIN = (args) => {
	return http({
		method: 'DELETE',
		params: args,
		url: `/admin/delete`,
	})
}
