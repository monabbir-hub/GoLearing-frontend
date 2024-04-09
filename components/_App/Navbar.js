import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import Link from "../../utils/ActiveLink";
import "../../styles/Navbar.module.css";
const Navbar = () => {
  const [menu, setMenu] = React.useState(true);
  const router = useRouter();

  const auth = useAuth();
  const toggleNavbar = () => {
    setMenu(!menu);
  };

  React.useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
    window.scrollTo(0, 0);
  });

  const handleLogout = () => {
    localStorage.removeItem("x-access-token");
    // localStorage.removeItem('browserToken')
    // auth.setPreviousPath('')

    auth.setUser({});
    router.push("/");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("go-learning-admin");
    auth.setAdmin({ role: [] });
    router.push("/admin");
  };

  const classOne = menu
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <React.Fragment>
      <div id="navbar" className="navbar-area">
        <div className="go-learning-nav">
          <div className="container-fluid px-4">
            <div className="navbar navbar-expand-lg navbar-light">
              <Link href="/">
                <a
                  onClick={toggleNavbar}
                  className="navbar-brand  d-flex justify-content-center align-items-center"
                >
                  <img
                    src="/images/go-learning-favicon.png"
                    alt="logo"
                    height="70px"
                    width="100px"
                  />
                </a>
              </Link>

              <button
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="#navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item" >
                    <Link href="tel:+8801860998077">
                      <a style={{ paddingRight: "10px" }} className="nav-link">
                        {"Contact: 01860998077"}
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item" style={{display:"none"}}>
                    <Link href="/academic">
                      <a style={{ paddingRight: "10px" }} className="nav-link">
                        {"Academic"}
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item ">
                    <Link href="/course/635389bea60d65dc8556ace1">
                      <a style={{ paddingRight: "10px" }} className="nav-link">
                        {"Admission"}
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item " style={{display:"none"}}>
                    <Link href="/course-list/62d3241aee11570016070d6a">
                      <a style={{ paddingRight: "10px" }} className="nav-link">
                        {"Job Preparation"}
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link href="/course/636a2b1733575ad94fefb5e9">
                      <a style={{ paddingRight: "10px" }} className="nav-link">
                        {"Skill Development"}
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item "  style={{display:"none"}}>
                    <Link href="/courses">
                      <a style={{ paddingRight: "10px" }} className="nav-link">
                        All Courses
                      </a>
                    </Link>
                  </li>
                </ul>

                <div className="others-option d-flex align-items-center">
                  <div className="option-item">
                    <div className="user-dropdown"></div>
                  </div>
                  {router?.pathname.slice(1, 6) !== "admin" &&
                  router?.pathname !== "AdminAuthentication" ? (
                    <div className="option-item">
                      {auth?.user?._id ? (
                        <div className="user-dropdown">
                          <Link href="/">
                            <a
                              onClick={(e) => e.preventDefault()}
                              className="default-btn me-3 m-0"
                            >
                              <i className="flaticon-user"></i>{" "}
                              {auth?.user?.name}
                              <span></span>
                            </a>
                          </Link>

                          <ul className="dropdown-menu">
                            <li className="nav-item">
                              <Link href="/my-courses" activeClassName="active">
                                <a onClick={toggleNavbar} className="nav-link">
                                  Profile
                                </a>
                              </Link>
                            </li>

                            {/* <li className="nav-item">
                              <Link
                                href="/user/my-profile"
                                activeClassName="active"
                              >
                                <a onClick={toggleNavbar} className="nav-link">
                                  My Profile
                                </a>
                              </Link>
                            </li> */}

                            <li className="nav-item">
                              <Link href="/">
                                <a
                                  className="nav-link"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleLogout();
                                  }}
                                >
                                  Logout
                                </a>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <Link href="/profile-authentication">
                          <a className="default-btn me-1">
                            <i className="flaticon-user"></i> Login/Register{" "}
                            <span></span>
                          </a>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="option-item">
                      {auth?.admin?._id ? (
                        <div className="user-dropdown">
                          <Link href="/">
                            <a
                              onClick={(e) => e.preventDefault()}
                              className="default-btn me-3"
                            >
                              <i className="flaticon-user"></i>{" "}
                              {auth?.admin?.name}
                              <span></span>
                            </a>
                          </Link>

                          <ul className="dropdown-menu">
                            <li className="nav-item">
                              <Link
                                href="/admin/admin-profile"
                                activeClassName="active"
                              >
                                <a onClick={toggleNavbar} className="nav-link">
                                  My Profile
                                </a>
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link href="/">
                                <a
                                  className="nav-link"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAdminLogout();
                                  }}
                                >
                                  Logout
                                </a>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <Link href="/AdminAuthentication">
                          <a className="default-btn">
                            <i className="flaticon-user"></i> Login As Admin{" "}
                            <span></span>
                          </a>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
