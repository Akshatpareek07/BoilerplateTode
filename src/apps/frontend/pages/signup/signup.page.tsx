import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './signup.page.scss';
import { Link } from 'react-router-dom';
import { Nav } from '../../components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDeps } from '../../contexts';

export default function SignUp(): React.ReactElement {
  const navigate = useNavigate();
  const { accessService } = useDeps();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      cpassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .required('Please enter a password')
        .min(8, 'Password must have at least 8 characters')
        .matches(/[0-9]/, 'Password must contains digit')
        .matches(/[a-z]/, 'Password must contains a lowercase alphabet')
        .matches(/[A-Z]/, 'Password must contains a uppercase alphabet'),
      cpassword: Yup.string()
        .required('Please re-type your password')
        .oneOf([Yup.ref('password')], 'Passwords does not match'),
    }),
    onSubmit: async (values) => {
      try {
        const user = await accessService.register(
          values.email,
          values.password,
        );
        if (user.data.id) {
          toast.error('Please Login to Continue');
          navigate(`/login`);
        }
      } catch (e) {
        toast.error('Error!! User Already Existed');
      }
    },
  });
  return (
    <div>
      <Nav>
        <div>
          <Link className="text-link" to="/login">
            Login
          </Link>
        </div>
      </Nav>
      <div className="signup-content">
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
              {formik.touched.email && formik.errors.email ? (
                <div className="form-item-error">{formik.errors.email}</div>
              ) : null}
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
              {formik.touched.password && formik.errors.password ? (
                <div className="form-item-error">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="form-item">
              <div className="form-item-input">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cpassword}
                />
              </div>
              {formik.touched.cpassword && formik.errors.cpassword ? (
                <div className="form-item-error">{formik.errors.cpassword}</div>
              ) : null}
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
