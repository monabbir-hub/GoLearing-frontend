import { http } from "../lib/axios";

export const GET_COURSES = ({ queryKey }) => {
  const [_, args] = queryKey;
  return http({
    method: "GET",
    params: args,
    url: "/course/get",
  });
};

export const GET_COURSE_FILTERS = ({ queryKey }) => {
  const [_, args] = queryKey;
  return http({
    method: "GET",
    params: args,
    url: "/course/get_all_filter",
  });
};

export const CREATE_COURSE = (values) => {
  return http({
    method: "POST",
    data: values,
    url: "/course/create",
  });
};

export const UPDATE_COURSE = (values) => {
  return http({
    method: "PUT",
    data: values,
    url: "/course/edit",
  });
};

export const DELETE_COURSE = (id) => {
  return http({
    method: "DELETE",
    url: `/course/delete?_id=${id}`,
  });
};

export const DUPLICATE_COURSE = (values) => {
  return http({
    method: "GET",
    params: values,
    url: "/course/duplicate",
  });
};
