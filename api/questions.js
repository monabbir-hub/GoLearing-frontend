import { http } from '../lib/axios'

export const GET_QUESTIONS = ({ queryKey }) => {
	const [_, args] = queryKey
	return http({
		method: 'GET',
		params: args,
		url: '/question/get',
	})
}

export const CREATE_QUESTION = (values) => {
	return http({
		method: 'POST',
		data: values,
		url: '/question/create',
	})
}

export const UPDATE_QUESTION = (values) => {
	return http({
		method: 'PUT',
		data: values,
		url: '/question/edit',
	})
}

export const DELETE_QUESTION = (id) => {
	return http({
		method: 'DELETE',
		url: `/question/delete?_id=${id}`,
	})
}
