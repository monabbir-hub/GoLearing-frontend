import React, { useEffect } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import router, { useRouter } from "next/router";
import AddCourseForm from "./AddCourseForm";
import AdminPage from "../../../components/admin/shared/AdminPage";
import Button from "../../../components/admin/shared/Button";
import { ADMIN_SIDEBAR } from "../../../components/admin/AdminSidebar";

const addCourse = () => {
  const { query, replace } = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.initializing && !auth.admin?._id) {
      router.replace("/admin");
    }
  }, [auth]);

  return auth.initializing ? (
    <p>Loading...</p>
  ) : (
    <AdminPage>
      <div className="mb-3" style={{ paddingLeft: "5%", marginTop: "20px" }}>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => replace(ADMIN_SIDEBAR.COURSES.PATH)}
        >
          Back to Courses
        </Button>
      </div>
      <h2 style={{ paddingLeft: "5%" }}>Add New Course</h2>
      <div style={{ padding: "5%" }}>
        <AddCourseForm />
      </div>
    </AdminPage>
  );
};

export default addCourse;
