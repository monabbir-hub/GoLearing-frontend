import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import AdminSidebar from "./AdminSidebar";
import AdminPage from "./shared/AdminPage";

export default function AdminLayout({ children }) {
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
      <div className="adminLayout pb-5" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="row">
          <div className="col-lg-2 col-md-3 adminLayout__sidebar">
            <AdminSidebar />
          </div>
          <div className="col-lg-9 col-md-12  adminLayout__content">
            {children}
          </div>
        </div>
      </div>
    </AdminPage>
  );
}
