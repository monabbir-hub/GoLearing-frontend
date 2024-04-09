import { http } from '../lib/axios'

export const GET_ORDERS_BY_ADMIN = ({ queryKey }) => {
	const [_, args] = queryKey
	return http({
		method: 'GET',
		params: args,
		url: '/order/get_by_admin',
	})
}

// export const CREATE_ORDER = (values) => {
// 	return http({
// 		method: 'POST',
// 		data: values,
// 		url: '/orders/create',
// 	})
// }

export const UPDATE_ORDER_BY_ADMIN = (values) => {
	return http({
		method: 'PUT',
		data: values,
		url: '/order/edit_by_admin',
	})
}

// export const DELETE_ORDER = (args) => {
// 	return http({
// 		method: 'DELETE',
// 		params: args,
// 		url: `/orders/delete`,
// 	})
// }
