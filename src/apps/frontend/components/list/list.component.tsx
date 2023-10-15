import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import './list.component.scss';

interface ListProps {
  key: number;
  item: string;
  isComplete: string;
  deleteEvent: (index: number) => void;
  completeEvent: (index: number) => void;
  editEvent: (index: number) => void;
}

const List: React.FC<ListProps> = ({
  key,
  item,
  isComplete,
  deleteEvent,
  completeEvent,
  editEvent,
}) => {
  const handleDelete = (key) => {
    deleteEvent(key);
  };
  const handleComplete = (key) => {
    completeEvent(key);
  };
  const handelEdit = (key) => {
    editEvent(key);
  };
  let content;
  if (isComplete !== 'false') content = <small>{isComplete}</small>;
  else content = null;
  return (
    <div className="todo-list-item" key={key}>
      <div>
        <h3>{item}</h3>
        {content}
      </div>
      <div className='todo-list-icons'>
        <div>
          <AiOutlineDelete
            className="icon"
            onClick={handleDelete}
            title="Delete?"
          />
        </div>
        <div onClick={handleComplete}>
          <BsCheckLg className="check-icon" title="Completed?" />
        </div>
        <div onClick={handelEdit}>
          <AiOutlineEdit title="Edit" />
        </div>
      </div>
    </div>
  );
};

export default List;
