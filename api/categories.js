import { http } from "../lib/axios";

export const GET_CATEGORIES = ({ queryKey }) => {
  const [_, args] = queryKey;
  return http({
    method: "GET",
    params: args,
    url: `/category/get`,
  });
};
export const DELETE_CATEGORY = (id) => {
  return http({
    method: "DELETE",
    url: `/category/delete?_id=${id}`,
  });
};
export const CREATE_CATEGORY = (values) => {
  return http({
    method: "POST",
    data: values,
    url: `/category/create`,
  });
};

export const UPDATE_CATEGORY = (values) => {
  return http({
    method: "PUT",
    data: values,
    url: "/category/edit",
  });
};
