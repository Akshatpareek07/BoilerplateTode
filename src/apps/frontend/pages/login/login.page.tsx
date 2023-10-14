import React, {useState} from 'react';
import './login.page.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Nav } from '../../components';
import { Link } from 'react-router-dom';
import { useDeps } from '../../contexts';
import { useNavigate } from 'react-router-dom';

// interface User{
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   cpassword: string;
// }

export default function Login(): React.ReactElement {
  const navigate=useNavigate();
  const { accessService } = useDeps();
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // const xyx=async(values)=>{
  //   await values();
  //   // console.log(values)
  //   // setUsername(values.email);
  //   // setPassword(values.password); 

  // }
  // const { accessService } = useDeps();
 
 
  // const set=(values)=>{
  //     setUsername(values.email);
  //     setPassword(values.password);
  //     console.log(username+" "+password);
  //     login();
  // }
  // const login =useCallback(async () => {
  //   console.log('called login');
      
  //     try {
  //       console.log(username+password);
  //       const loginDetails=await accessService.login(username, password);
  //       console.log(loginDetails);
  //       const token=await accessService.generateToken(username,password);
  //       console.log('token generated');
  //       console.log(token);
  //       setSuccess(true);
  //       console.log(success);
  //     } catch (err) {
  //       setError(true);
  //       console.log(error);
  //     }
  //   }, [
  //     accessService,
  //     username,
  //     password,
  //   ]);
  
  
  
  // const testAdd=async (id,token)=>{
  //   const description=prompt("Please enter Description");
  //   console.log("result");
  //   console.log(await accessService.addTodo(id,description,token));
  //   console.log(await accessService.getAllTodos(id,token));
    

  // }
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
      
      // setUsername(values.email);
      // setPassword(values.password); 
      try {
              const loginDetails=
              await accessService.login(values.email, values.password);
              // console.log("LoginDetails");
               console.log(loginDetails);
              const responsetoken=await accessService.generateToken(values.email,values.password);

              // console.log(`token generated  ${responsetoken.data.token}`);
              localStorage.setItem('token',`${responsetoken.data.token}`);
              localStorage.setItem('accountId',`${loginDetails.data.id}`);
            console.log(responsetoken);
              
              // testAdd(loginDetails.data.id,responsetoken.data.token);
              navigate(`/dashboard/${loginDetails.data.id}`);
              console.log("success");
            } catch (err) {
              setError(true);
              console.log(error);
            }
          
    }
   
    // onSubmit: async(values) => {
      
    //   xyx((values)=>{
    //     console.log(values)
    // setUsername(values.email);
    // setPassword(values.password); 

    //    });
    // },
  });

  return (
    <div>
    <Nav>
     <div>
            <Link className='text-link' to='/signup'>SignUp</Link>       </div>
    </Nav>
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
        // onChange={(e)=>setUserName(e.target.value)}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
    </div>
  );
}
