import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../../providers/AuthProvider";
import { AdminLoginEnd } from "../../utils/EndPoints";
import Toast from "../../utils/Toast";
import { ADMIN_SIDEBAR } from "../admin/AdminSidebar";

const LoginForAdmin = () => {
  const router = useRouter();

  const [authValue, setAuthValue] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [spinner, setSpinner] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (!auth.initialization && auth.admin?._id) {
      router.replace(ADMIN_SIDEBAR.DASHBOARD.PATH);
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authValue.email === "") {
      Toast("err", "Please enter your email");
      return;
    }
    if (authValue.password === "") {
      Toast("err", "Please enter your password");
      return;
    }

    setSpinner(true);
    try {
      const response = await axios.post(AdminLoginEnd, {
        email: authValue.email,
        password: authValue.password,
      });

      if (response.status === 200) {
        Toast("success", "Successfully logged in as Admin");
        setSpinner(false);
        auth.setAdmin(response?.data?.["x-access-token"]?.admin);
        localStorage.setItem(
          "go-learning-admin",
          response?.data?.["x-access-token"]?.token
        );
        setAuthValue({
          email: "",
          password: "",
          rememberMe: false,
        });
        router.replace(ADMIN_SIDEBAR.COURSES.PATH);
      } else {

        throw new Error(
          response?.data?.msg || " Something went wrong! Try again later."
        );
      }
    } catch (error) {

      setSpinner(false);
      Toast(
        "err",
        error.response?.data?.msg || "Something went wrong! Try again later."
      );
      setAuthValue({
        email: "",
        password: "",
        rememberMe: false,
      });
    }
  };

  return (
    <div className="login-form">
      <h2>Login As Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={authValue?.email}
            onChange={(e) =>
              setAuthValue({ ...authValue, email: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={authValue?.password}
            onChange={(e) =>
              setAuthValue({ ...authValue, password: e.target.value })
            }
          />
        </div>

        <div className=" lost-your-password-wrap">
          <Link href="/admin/reset-password">
            <a className="lost-your-password">Lost your password?</a>
          </Link>
        </div>

        <div className="row align-items-center">
          {/* <div className='col-lg-6 col-md-6 col-sm-6 remember-me-wrap'>
						<p>
							<input
								type='checkbox'
								id='test2'
								value={authValue.rememberMe}
								onChange={() =>
									setAuthValue({
										...authValue,
										rememberMe: !authValue?.rememberMe,
									})
								}
							/>
							<label htmlFor='test2'>Remember me</label>
						</p>
					</div> */}

          {/* <div className='col-lg-6 col-md-6 col-sm-6 lost-your-password-wrap'>
						<Link href='#'>
							<a className='lost-your-password'>Lost your password?</a>
						</Link>
					</div> */}
        </div>

        <button type="submit">
          Log In {spinner && <Spinner animation="border" size="sm" />}
        </button>

        {/* <a
          className='w-100 mt-3 custom-login-btn'
          href={StudentSignInWithGoogle}
        >
          {' '}
          <FcGoogle
            style={{ height: '2rem', width: '2rem', marginRight: '5px' }}
          />
          Log in with Google
        </a>

        <a
          className='w-100 my-2 custom-login-btn'
          href={StudentSignInWithFacebook}
        >
          <IoLogoFacebook
            style={{ height: '2rem', width: '2rem', marginRight: '5px' }}
          />
          Log in with Facebook{' '}
        </a> */}
      </form>

      {/* <p className='text-center mt-2 mb-0'>
        <strong>OR</strong>{' '}
      </p> */}
    </div>
  );
};

export default LoginForAdmin;
