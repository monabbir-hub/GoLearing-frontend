import { http } from '../lib/axios'

export const GET_STUDENTS = ({ queryKey }) => {
	const [_, args] = queryKey
	return http({
		method: 'GET',
		params: args,
		url: '/student/get',
	})
}

export const BULK_REMOVE_COURSE = (args) => {
	return http({
		method: 'GET',
		params: args,
		url: '/student/bulk_remove_from_a_course',
	})
}

export const SIGNUP_STUDENT = (values) => {
	return http({
		method: 'POST',
		data: values,
		url: '/student/signup',
	})
}

export const UPDATE_STUDENT = (values) => {
	return http({
		method: 'PUT',
		data: values,
		url: '/student/edit_profile',
	})
}

export const DELETE_STUDENT = (args) => {
	return http({
		method: 'DELETE',
		params: args,
		url: `/student/delete`,
	})
}

export const ASSIGN_COURSE_TO_STUDENTS = (args) => {
	return http({
		method: 'PUT',
		data: args,
		url: '/student/assign_course_to_student',
	})
}

export const REVOKE_COURSE_TO_STUDENTS = (args) => {
	return http({
		method: 'PUT',
		data: args,
		url: '/student/revoke_course_from_student',
	})
}

export const REMOVE_STUDENT_TOKEN = (args) => {
	return http({
		method: 'PUT',
		data: args,
		url: '/student/remove_fingerprint_token',
	})
}
