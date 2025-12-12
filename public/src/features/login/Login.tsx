import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/loginpage_logo.jpeg';
import mheLogo from '../../assets/loginpageside.png';
import EmailIcon from '@rsuite/icons/Email';
import LockIcon from '@rsuite/icons/Lock';
import H24Icon from '../../assets/h24hours.png';
import handPhoneIcon from '../../assets/handphone.png';
import locationPointIcon from '../../assets/locationpoint.png';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import apiRequest from '../../utils/api-request';

const initialValues = {
  email: '',
  password: '',
  remember: false,
};

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required!'),
  email: Yup.string()
    .email('Invalid Email address')
    .required('Email is required!'),
});

interface LoginAttributes {
  email: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const navigate = useNavigate();

  const handleFormSubmit: (values: LoginAttributes) => Promise<void> = async (
    values
  ) => {
    try {
      const resp: any = await apiRequest({ url: '/auth/login', method: 'POST', data: { email: values.email, password: values.password }});
      localStorage.setItem('token', resp.token);
      window.location.href = '/#/';
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
          <div className="bg-blue-800 h-full">
            <div className="bg-white p-4 h-full">
              <div className="w-1/3 mx-10 pt-20">
                <img src={logo} alt="loginpage_logo.jpeg" />
              </div>
              <div className="login-form-container mx-16 my-5">
                <div className="login-form">
                  <h2 className="text-3xl font-semibold mb-4">Sign In</h2>
                  <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="block text-gray-700"
                          >
                            Email
                          </label>
                          <div className="flex items-center border-gray-300 border-2 border-t-0 border-x-0">
                            <span className="py-1 text-xl">
                              <EmailIcon />
                            </span>
                            <input
                              type="email"
                              id="email"
                              placeholder="Enter your email address"
                              className={`w-full p-2 border-0 focus:outline-none ${
                                errors.email && touched.email
                                  ? 'border-red-500'
                                  : ''
                              }`}
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          {errors.email && touched.email && (
                            <span className="text-red-500">{errors.email}</span>
                          )}
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="password"
                            className="block text-gray-700"
                          >
                            Password
                          </label>
                          <div className="flex items-center border-gray-300 border-2 border-t-0 border-x-0">
                            <span className="py-1 text-xl">
                              <LockIcon />
                            </span>
                            <input
                              type="password"
                              id="password"
                              placeholder="Enter your password"
                              className={`w-full p-2 border-0 focus:outline-none ${
                                errors.password && touched.password
                                  ? 'border-red-500'
                                  : ''
                              }`}
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          {errors.password && touched.password && (
                            <span className="text-red-500">
                              {errors.password}
                            </span>
                          )}
                        </div>
                        <div className="mb-10">
                          <input
                            type="checkbox"
                            checked={values.remember}
                            value={values.password}
                            onChange={handleChange}
                            name="remember"
                            id="remember"
                          />
                          <label
                            htmlFor="remember"
                            className="ml-2 text-gray-700"
                          >
                            Remember me
                          </label>
                          <Link
                            to="/forgot-password"
                            className="float-right text-gray-700"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                        <button
                          type="submit"
                          className="bg-custom-blue text-white py-2 px-4 rounded-full h-12 text-lg w-full"
                        >
                          {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 h-full">
            <div className="bg-custom-blue rounded-lg h-full relative">
              <img src={mheLogo} alt="loginpageside.png" />
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={H24Icon} alt="h24hours.png" />
              </div>
              <div className="absolute top-40 -right-56 transform -translate-x-1/2">
                <img
                  src={handPhoneIcon}
                  alt="handphone.png"
                  className="w-4/5"
                />
                <div className="absolute top-5 left-1/3 transform -translate-x-1/2">
                  <img src={locationPointIcon} alt="locationpoint.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
