import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { API } from "../../../api";
import AdminLayout from "../../../components/admin/AdminLayout";
import AddEditCourse from "../../../components/admin/modals/AddEditCourse";
import Button from "../../../components/admin/shared/Button";
import Table from "../../../components/admin/shared/Table";
import { deleteConfirmation } from "../../../lib/sweetAlert";

export default function Courses() {
  const router = useRouter();
  const [search, setSearch] = useState(null);

  const {
    data: coursesData,
    status,
    error,
    refetch,
  } = useQuery(
    [
      API.COURSES.GET_COURSES.name,
      {
        ...(search ? { filter: search } : {}),
      },
    ],
    API.COURSES.GET_COURSES
  );
  const { mutateAsync: duplicateCourse } = useMutation(
    API.COURSES.DUPLICATE_COURSE
  );
  const { mutateAsync: deleteCourse } = useMutation(API.COURSES.DELETE_COURSE);

  const handleDeleteCourse = useCallback(async (id) => {
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
  const handleDuplicateCourse = useCallback(async (id) => {
    try {
      const { isConfirmed } = await deleteConfirmation();
      if (!isConfirmed) return;
      await duplicateCourse({ course_id: id });
      await refetch();
      toast.success("Successfully duplicated course");
    } catch (err) {
      toast.error(err?.response?.data?.msg || err?.message);
    }
  }, []);

  return (
    <AdminLayout>
      <div className="courses">
        <h3 className="page-title">
          Courses
          {/* <AddEditCourse> */}
          <Button onClick={() => router.push(`/admin/courses/addCourse`)}>
            + Add New
          </Button>
          {/* </AddEditCourse> */}
        </h3>

        <Table
          // query={{ status, error }}
          // searchPlaceholder="Search by filters, course name"
          // onSearch={({ target }) => {
          //   setSearch(target.value);
          // }}
          headers={[
            // { name: "ID", key: "_id" },
            { name: "Title", key: "title" },
            { name: "Instructor Name", key: "instructor_name" },
            { name: "Details", key: "details" },
            { name: "Price", key: "price" },
            { name: "Duration", key: "duration" },
            { name: "Status", key: "status" },
          ]}
          data={coursesData?.data}
          actions={[
            { name: "Edit", wrapper: AddEditCourse, onClick: () => {} },
            {
              name: "Delete",
              onClick: (data) => handleDeleteCourse(data?._id),
            },
            {
              name: "Duplicate",
              onClick: (data) => handleDuplicateCourse(data?._id),
            },
            {
              name: "Manage",
              onClick: (data) =>
                router.push(`/admin/courses/manage/${data?._id}`),
            },
          ]}
        />
      </div>
    </AdminLayout>
  );
}
