import React from 'react';
import {Link} from 'react-router-dom'
export default function Home(): React.ReactElement {
    return (
      <div className='container'>
        <div>
          <Link to='/login'>Login</Link>
          <p></p>
          <Link to='/signup'>SignUp</Link>
        </div>
        
      </div>
    );
  }