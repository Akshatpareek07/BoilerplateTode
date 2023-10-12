import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './signup.page.scss';

interface User{
      email: string;
      password: string;
      cpassword: string;
}
export default function SignUp(): React.ReactElement {
  const [user,setUser]=useState<User>({
      email: '',
      password: '',
      cpassword: '',
  });
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
        // check minimum characters
        .min(8, 'Password must have at least 8 characters')
        // different error messages for different requirements
        .matches(/[0-9]/, 'Password must contains digit')
        .matches(/[a-z]/, 'Password must contains a lowercase alphabet')
        .matches(/[A-Z]/, 'Password must contains a uppercase alphabet'),
      cpassword: Yup.string()
        .required('Please re-type your password')
        .oneOf([Yup.ref('password')], 'Passwords does not match'),
    }),
    onSubmit: (values) => {

      setUser({
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

      <label htmlFor="cpassword">Confirm Password</label>
      <input
        id="cpassword"
        name="cpassword"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.cpassword}
      />
      {formik.touched.cpassword && formik.errors.cpassword ? (
        <div>{formik.errors.cpassword}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
}
