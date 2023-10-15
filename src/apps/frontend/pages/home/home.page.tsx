import React from 'react';
import {Link} from 'react-router-dom'
import { Nav } from '../../components';
import './home.page.scss'   


export default function Home(): React.ReactElement {
    return (
      <div className='home-container'>
          <Nav  >
            <div>
            <Link className='text-link' to='/login'>Login</Link>
            </div><div>
            <Link className='text-link' to='/signup'>SignUp</Link>
            </div>
          </Nav>
          <div className='home-content'>
              Welcome to the TODO App
          </div>

        
      </div>
    );
  }