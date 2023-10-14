import React, { PropsWithChildren } from 'react';
import { LuListTodo } from 'react-icons/lu';
import './nav.component.scss';

const Nav:React.FC<PropsWithChildren>=({children})=>( 
      <div className='nav-container'>
            <div className='nav-left-part'>  
            <LuListTodo></LuListTodo>
            <p>TODO APP</p>
            </div>
            <div className='nav-right-part'>
            {children}
            </div>
      </div>
);

// export default function Nav({children,}): React.FC<PropsWithChildren> 
//   (
//     <div className='container'>
//       <LuListTodo></LuListTodo>
//       TODO APP
//       {children}
//     </div>
//   );
// LuListTodo
export default Nav;