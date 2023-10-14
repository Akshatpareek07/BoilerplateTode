import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import { DepsProvider } from './contexts';
import { Config } from './helpers';
import { SignUp, Login, Home, Dashboard} from './pages';
import { AccessService } from './services';
import InspectLet from './vendor/inspectlet';

import { ToastContainer} from 'react-toastify';

import './app.global.scss';''

export default function App(): React.ReactElement {
  useEffect(() => {
    const inspectletKey = Config.getConfigValue('inspectletKey');

    if (inspectletKey) {
      InspectLet();
    }
  }, []);

  return (
    <DepsProvider deps={{
      accessService: new AccessService(),
    }}>
      <Router>
        <div className='app-container'>
          
          <ToastContainer/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            
            <Route path='/dashboard/:_id' element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </DepsProvider>
  );
}
