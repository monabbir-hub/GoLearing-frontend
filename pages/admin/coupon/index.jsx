import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { API } from "../../../api";
import AdminLayout from "../../../components/admin/AdminLayout";
import AddEditCoupon from "../../../components/admin/modals/AddEditCoupon";
import AddEditCourse from "../../../components/admin/modals/AddEditCourse";
import AddEditStudent from "../../../components/admin/modals/AddEditStudent";
import AssignCourse from "../../../components/admin/modals/AssignCourse";
import BulkRevokeCourse from "../../../components/admin/modals/BulkRevokeCourse";
import RevokeCourse from "../../../components/admin/modals/RevokeCourse";
import Button from "../../../components/admin/shared/Button";
import Table from "../../../components/admin/shared/Table";
import { deleteConfirmation } from "../../../lib/sweetAlert";

const studentsSortOptions = [
  { label: "Name (A - Z)", value: "name_ascending" },
  { label: "Name (Z - A)", value: "name_descending" },
  { label: "Time (Oldest)", value: "time_ascending" },
  { label: "Time (Newest)", value: "time_descending" },
];
export default function Students() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);
  const [sort, setSort] = useState(null);
  const {
    data: couponData,
    status,
    error,
    refetch,
  } = useQuery(
    [
      API.COUPONS.GET_COUPONS.name,
      {
        // page,
        // ...(search ? { filter: search } : {}),
        // ...(sort ? { sort } : {}),
      },
    ],
    API.COUPONS.GET_COUPONS
  );
  const { mutateAsync: deleteCoupon } = useMutation(API.COUPONS.DELETE_COUPON);

  const removeCouponHandler = useCallback(async (id) => {
    try {
      const { isConfirmed } = await deleteConfirmation();
      if (!isConfirmed) return;
      await deleteCoupon({
        _id: id,
      });
      await refetch();
      toast.success("Successfully removed coupon");
    } catch (err) {
      toast.error(err?.response?.data?.msg || err?.message);
    }
  }, []);

  return (
    <AdminLayout>
      <div className="courses">
        <h3 className="page-title">
          Coupons
          <span>
            <AddEditCoupon>
              <Button>+ Add New</Button>
            </AddEditCoupon>
            {/* <BulkRevokeCourse>
              <Button>Bulk Revoke Course</Button>
            </BulkRevokeCourse> */}
          </span>
        </h3>

        <Table
          query={{ status, error }}
          //   searchPlaceholder="Search by name, email"
          //   onSearch={({ target }) => {
          //     setPage(1);
          //     setSearch(target.value);
          //   }}
          //   sort={[
          //     {
          //       options: studentsSortOptions,
          //       onSort: (val) => setSort(val?.value || null),
          //     },
          //   ]}
          headers={[
            { name: "ID", key: "_id" },
            { name: "Coupon", key: "coupon" },
            { name: "Amount", key: "discount" },
          ]}
          //   data={couponData?.data?.data?.data?.map((item) => ({
          //     ...item,
          //   }))}
          data={couponData?.data?.data}
          actions={[
            { name: "Edit", wrapper: AddEditCoupon, onClick: () => {} },
            {
              name: "Remove Coupon",

              onClick: (data) => removeCouponHandler(data._id),
            },
          ]}
          //   pagination={{
          //     setPage,
          //     page,
          //     totalPage: studentsData?.data?.data?.total_page,
          //     totalItemsCount: studentsData?.data?.data?.total_documents,
          //   }}
        />
      </div>
    </AdminLayout>
  );
}
