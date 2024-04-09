import { http } from '../lib/axios'

export const GET_MODULES = ({ queryKey }) => {
	const [_, args] = queryKey
	return http({
		method: 'GET',
		params: args,
		url: '/module/get',
	})
}

export const CREATE_MODULE = (values) => {
	return http({
		method: 'POST',
		data: values,
		url: '/module/create',
	})
}

export const UPDATE_MODULE = (values) => {
	return http({
		method: 'PUT',
		data: values,
		url: '/module/edit',
	})
}

export const DELETE_MODULE = (id) => {
	return http({
		method: 'DELETE',
		url: `/module/delete?_id=${id}`,
	})
}
