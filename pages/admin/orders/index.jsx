import { format } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { API } from "../../../api";
import AdminLayout from "../../../components/admin/AdminLayout";
import PreviewOrderDetails from "../../../components/admin/modals/PreviewOrderDetails";
import Table from "../../../components/admin/shared/Table";
import Tooltip from "../../../components/admin/shared/Tooltip";
import { deleteConfirmation } from "../../../lib/sweetAlert";

const ordersSortOptions = [
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Rejected", value: "rejected" },
];
export default function Orders() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);
  const [sort, setSort] = useState(null);
  const [filterByCourse, setFilterByCourse] = useState(null);
  const {
    data: ordersData,
    status,
    error,
    refetch,
  } = useQuery(
    [
      API.ORDERS.GET_ORDERS_BY_ADMIN.name,
      {
        page,
        ...(search ? { filter: search } : {}),
        ...(sort ? { status: sort } : {}),
        ...(filterByCourse ? { course_id: filterByCourse } : {}),
      },
    ],
    API.ORDERS.GET_ORDERS_BY_ADMIN
  );
  const { data: coursesData } = useQuery(
    [API.COURSES.GET_COURSES.name, {}],
    API.COURSES.GET_COURSES
  );
  const { mutateAsync: updateOrder } = useMutation(
    API.ORDERS.UPDATE_ORDER_BY_ADMIN
  );



  const handleUpdateOrder = useCallback(async (data, status, message) => {
    try {
      const { isConfirmed } = await deleteConfirmation(message);
      if (!isConfirmed) return;
      await updateOrder({
        status,
        id: data._id,
      });
      await refetch();
      toast.success("Successfully updated order");
    } catch (err) {
      toast.error(err?.response?.data?.msg || err?.message);
    }
  }, []);
  const coursesOptionsForSort = useMemo(() => {
    return coursesData?.data?.map((c) => ({
      label: c.title,
      value: c._id,
    }));
  }, [coursesData]);

  return (
    <AdminLayout>
      <div className="courses">
        <h3 className="page-title">
          Orders
          {/* <AddEditCourse>
						<Button>+ Add New</Button>
					</AddEditCourse> */}
        </h3>

        <Table
          query={{ status, error }}
          onSearch={({ target }) => {
            setPage(1);
            setSearch(target.value);
          }}
          sort={[
            {
              options: coursesOptionsForSort,
              onSort: (val) => setFilterByCourse(val?.value || null),
              props: { placeholder: "Filter By Course" },
            },
            {
              options: ordersSortOptions,
              onSort: (val) => setSort(val?.value || null),
              props: { placeholder: "Filter By Status" },
            },
          ]}
          headers={[
            { name: "Course", key: "details.course.title" },
            { name: "Transaction ID", key: "bkash_transaction_idChanged" },
            // { name: "Payment Provider", key: "modifiedPaymentProvider" },
            { name: "Paid", key: "subtotal" },
            { name: "Sent From", key: "phone" },
            { name: "Student Name", key: "student_id.name" },
            { name: "Student Email", key: "student_id.email" },
            { name: "Student Phone", key: "student_id.phone" },
            { name: "Date", key: "createdAt" },
            { name: "Status", key: "modifiedStatus" },
          ]}
          data={ordersData?.data?.data?.data?.map((item) => ({
            ...item,
            bkash_transaction_idChanged: (
              <div style={{ wordBreak: "break-all" }}>
                {item.bkash_transaction_id}
              </div>
            ),

            createdAt: (
              <span
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {format(new Date(item.createdAt), "dd-MM-yyyy")}
              </span>
            ),
            modifiedPaymentProvider:
              item.payment_provider === "bkash" ? (
                <img src="/images/bkash.svg" width="30" alt="" />
              ) : item.payment_provider === "nagad" ? (
                <img src="/images/nagad.svg" width="30" alt="" />
              ) : item.payment_provider === "rocket" ? (
                <img src="/images/rocket.jpeg" width="30" alt="" />
              ) : (
                item.payment_provider
              ),
            modifiedStatus:
              item.status === "confirmed" ? (
                <Tooltip message="Order confirmed">
                  <FaCheck />
                </Tooltip>
              ) : item.status === "pending" ? (
                <Tooltip message="Order pending">
                  <CgSpinnerTwo />
                </Tooltip>
              ) : item.status === "rejected" ? (
                <Tooltip message="Order rejected">
                  <FaTimes />
                </Tooltip>
              ) : (
                item.status
              ),
          }))}
          actions={[
            {
              name: "View",
              wrapper: PreviewOrderDetails,
            },
            {
              name: "Confirm",
              show: {
                where: "status",
                equalTo: ["rejected", "pending"],
              },
              onClick: (data) =>
                handleUpdateOrder(
                  data,
                  "confirmed",
                  "You are confirming you have received this payment."
                ),
            },
            {
              name: "Reject",
              show: {
                where: "status",
                equalTo: ["confirmed", "pending"],
              },
              onClick: (data) =>
                handleUpdateOrder(
                  data,
                  "rejected",
                  "You are confirming you did not received this payment."
                ),
            },
          ]}
          pagination={{
            setPage,
            page,
            totalPage: ordersData?.data?.data?.total_page,
          }}
        />
      </div>
    </AdminLayout>
  );
}
