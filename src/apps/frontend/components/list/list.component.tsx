import React from 'react'
import {AiOutlineDelete,AiOutlineEdit} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';


// import '../loginUser.css';

// const List = (props) => {
//   return (
//     <div className='todo-list-item' key={props.key}>
//     <div>
//         <h3>{props.itm.taskName}</h3>
//         <p>{props.itm.taskDescription}</p>
//     </div>
//     <div>
//         <AiOutlineDelete className='icon' onClick={props.deleteEvent} title='Delete?'/>
//         <BsCheckLg className='check-icon' onClick={props.completeEvent} title='Completed?'/>
//     </div>
//  </div>
//   )
// }

interface ListProps {
  key: number;
  item: string;
  isComplete:string;
  deleteEvent:(index:number)=>void;
  completeEvent:(index:number)=>void;
  editEvent:(index:number)=>void;
}

// Define the functional component with the specified props
const List: React.FC<ListProps> = ({key,item,isComplete,deleteEvent,completeEvent,editEvent}) => {
  
 const handleDelete = (key) => {
  deleteEvent(key);
  };
  const handleComplete = (key) => {
    completeEvent(key);
    };
    const handelEdit=(key)=>{
      editEvent(key);
    }
    let content;
    if(isComplete!=="false")
    content=<small>{isComplete}</small>
    else
    content=null;
  return (
      <div className='todo-list-item' key={key}>
     <div>
         <p>{item}</p>
        {content}
     </div>
     <div>
         <AiOutlineDelete className='icon' onClick={handleDelete} title='Delete?'/>
         <div onClick={handleComplete}>
         <BsCheckLg className='check-icon'  title='Completed?'/>
         </div>
         <div onClick={handelEdit}>
          <AiOutlineEdit title='Edit'/>
         </div>
     </div>
  </div>
  );
};

export default List;
