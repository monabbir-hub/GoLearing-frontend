import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { API } from "../../../api";
import AdminLayout from "../../../components/admin/AdminLayout";
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
    data: studentsData,
    status,
    error,
    refetch,
  } = useQuery(
    [
      API.STUDENTS.GET_STUDENTS.name,
      {
        page,
        ...(search ? { filter: search } : {}),
        ...(sort ? { sort } : {}),
      },
    ],
    API.STUDENTS.GET_STUDENTS
  );
  const { mutateAsync: deleteCourse } = useMutation(API.COURSES.DELETE_COURSE);
  const { mutateAsync: removeTokenMutation } = useMutation(
    API.STUDENTS.REMOVE_STUDENT_TOKEN
  );

  const handleDeleteUser = useCallback(async (id) => {
    try {
      const { isConfirmed } = await deleteConfirmation();
      if (!isConfirmed) return;
      await deleteCourse(id);
      await refetch();
      toast.success("Successfully deleted course");
    } catch (err) {
      toast.error(err?.response?.data?.msg || err?.message);
    }
  }, []);
  const removeTokenHandler = useCallback(async (id) => {
    try {
      const { isConfirmed } = await deleteConfirmation();
      if (!isConfirmed) return;
      await removeTokenMutation({
        student_id: id,
      });
      await refetch();
      toast.success("Successfully removed token");
    } catch (err) {
      toast.error(err?.response?.data?.msg || err?.message);
    }
  }, []);

  return (
    <AdminLayout>
      <div className="courses">
        <h3 className="page-title">
          Students
          <span>
            <AddEditStudent>
              <Button>+ Add New</Button>
            </AddEditStudent>
            <BulkRevokeCourse>
              <Button>Bulk Revoke Course</Button>
            </BulkRevokeCourse>
          </span>
        </h3>

        <Table
          query={{ status, error }}
          searchPlaceholder="Search by name, email"
          onSearch={({ target }) => {
            setPage(1);
            setSearch(target.value);
          }}
          sort={[
            {
              options: studentsSortOptions,
              onSort: (val) => setSort(val?.value || null),
            },
          ]}
          headers={[
            { name: "Name", key: "name" },
            { name: "Email", key: "email" },
            { name: "Verified", key: "isVerified" },
          ]}
          data={studentsData?.data?.data?.data?.map((item) => ({
            ...item,
            isVerified: item?.verified ? "Yes" : "No",
          }))}
          actions={[
            { name: "Assign Course", wrapper: AssignCourse, onClick: () => {} },
            { name: "Revoke Course", wrapper: RevokeCourse, onClick: () => {} },
            {
              name: "Remove Token",
              show: {
                where: "fingerprint_token",
                notEqualTo: [null],
              },
              onClick: (data) => removeTokenHandler(data._id),
            },
          ]}
          pagination={{
            setPage,
            page,
            totalPage: studentsData?.data?.data?.total_page,
            totalItemsCount: studentsData?.data?.data?.total_documents,
          }}
        />
      </div>
    </AdminLayout>
  );
}
