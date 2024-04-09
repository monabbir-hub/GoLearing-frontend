import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { RiStackLine } from "react-icons/ri";
import { MdGridView } from "react-icons/md";
import { BsCalendar4Event } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiSettings3Line } from "react-icons/ri";

export const ADMIN_SIDEBAR = {
  DASHBOARD: {
    NAME: "Dashboard",
    PATH: "/admin/dashboard",
    ICON: <MdGridView style={{ marginRight: "10px" }} />,
  },
  COURSES: {
    NAME: "Courses",
    PATH: "/admin/courses",
    ICON: <RiStackLine style={{ marginRight: "10px" }} />,
  },
  ORDERS: {
    NAME: "Orders",
    PATH: "/admin/orders",
    ICON: <RiShoppingCartLine style={{ marginRight: "10px" }} />,
  },
  STUDENTS: {
    NAME: "Students",
    PATH: "/admin/students",
    ICON: <BsCalendar4Event style={{ marginRight: "10px" }} />,
  },
  SITE: {
    NAME: "Site",
    PATH: "/admin/site",
    ICON: <RiSettings3Line style={{ marginRight: "10px" }} />,
  },
  CATEGORIES: {
    NAME: "Categories",
    PATH: "/admin/categories",
    ICON: <RiSettings3Line style={{ marginRight: "10px" }} />,
  },
  COUPON: {
    NAME: "Coupon",
    PATH: "/admin/coupon",
    ICON: <RiSettings3Line style={{ marginRight: "10px" }} />,
  },
  LeaderBoard:{
    NAME: "Leaderboard",
    PATH: "/admin/leaderboard",
    ICON: <RiSettings3Line style={{ marginRight: "10px" }} />,
  }
};

export default function AdminSidebar() {
  const { pathname } = useRouter();

  return (
    <div className="adminSidebar">
      {Object.values(ADMIN_SIDEBAR).map((item) => (
        <Link href={item.PATH} key={item.NAME}>
          <a
            className={`adminSidebar__item ${
              String(item.PATH) === String(pathname) ? "active" : ""
            }`}
          >
            {item.ICON}
            {item.NAME}
          </a>
        </Link>
      ))}
    </div>
  );
}
