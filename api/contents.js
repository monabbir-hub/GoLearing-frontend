import { http } from "../lib/axios";

export const GET_CONTENTS = ({ queryKey }) => {
  const [_, args] = queryKey;
  return http({
    method: "GET",
    params: args,
    url: "/content/get",
  });
};

export const CREATE_CONTENT = (values) => {
  return http({
    method: "POST",
    data: values,
    url: "/content/create",
  });
};

export const UPDATE_CONTENT = (values) => {
  return http({
    method: "PUT",
    data: values,
    url: "/content/edit",
  });
};

export const DELETE_CONTENT = (args) => {
  return http({
    method: "DELETE",
    params: args,
    url: `/content/delete`,
  });
};
export const GET_CATEGORIES = ({ queryKey }) => {
  const [_, args] = queryKey;
  return http({
    method: "GET",
    params: args,
    url: `/category/get`,
  });
};
