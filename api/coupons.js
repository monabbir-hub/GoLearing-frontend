import { http } from "../lib/axios";

export const GET_COUPONS = ({ queryKey }) => {
  const [_, args] = queryKey;
  return http({
    method: "GET",
    params: args,
    url: "/coupon/get",
  });
};

export const CREATE_COUPON = (values) => {
  return http({
    method: "POST",
    data: values,
    url: "/coupon/create",
  });
};

export const UPDATE_COUPON = (values) => {
  return http({
    method: "PUT",
    data: values,
    url: "/coupon/edit",
  });
};

export const DELETE_COUPON = (args) => {
  return http({
    method: "DELETE",
    params: args,
    url: `/coupon/delete`,
  });
};
export const APPLY_COUPON = ({ queryKey }) => {
  const [_, args] = queryKey;
  return http({
    method: "GET",
    params: args,
    url: "/coupon/apply_coupon",
  });
};
