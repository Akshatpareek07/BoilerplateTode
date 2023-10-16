import React from 'react';
import './login.page.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Nav } from '../../components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AccessService } from '../../services';

export default function Login(): React.ReactElement {
  const navigate = useNavigate();
  const accessService = new AccessService();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .required('Please enter a password')
        .min(8, 'Password must have at least 8 characters')
        .matches(/[0-9]/, 'Password must contains digit')
        .matches(/[a-z]/, 'Password must contains a lowercase alphabet')
        .matches(/[A-Z]/, 'Password must contains a uppercase alphabet'),
    }),
    onSubmit: async (values) => {
      try {
        const loginDetails = await accessService.login(
          values.email,
          values.password,
        );

        const responsetoken = await accessService.generateToken(
          values.email,
          values.password,
        );

        localStorage.setItem('token', `${responsetoken.data.token}`);
        localStorage.setItem('accountId', `${loginDetails.data.id}`);

        toast.success('Logined Successfully');
        navigate(`/dashboard/${loginDetails.data.id}`);
      } catch (err) {
        toast.error('Error! Login Failed');
      }
    },
  });

  return (
    <div>
      <Nav>
        <div>
          <Link className="text-link" to="/signup">
            SignUp
          </Link>
        </div>
      </Nav>
      <div className="login-content">
        <div className="form-container">
          <form onSubmit={formik.handleSubmit} className="form-item-container">
            <div className="form-item">
              <div className="form-item-input">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              <div className="form-item-error">
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
            <div className="form-item">
              <div className="form-item-input">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              <div className="form-item-error">
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
