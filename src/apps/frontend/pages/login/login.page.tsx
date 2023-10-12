// import React, { useCallback, useState } from 'react';
import React, {useState} from 'react';
// import { useDeps } from '../../contexts';
import './login.page.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface User{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cpassword: string;
}

export default function Login(): React.ReactElement {
  const [user,setUser]=useState<User>({
    firstName: '',
      lastName: '',
      email: '',
      password: '',
      cpassword: '',
  });
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
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
    onSubmit: (values) => {
      setUser({
        firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      cpassword: values.cpassword,
      });
      alert(JSON.stringify(user));
      
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
}
