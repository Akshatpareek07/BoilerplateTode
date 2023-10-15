import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDeps } from '../../contexts';
import './todoinput.component.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface todoInputProps {
  _id: string;
}
const TodoInput: React.FC<todoInputProps> = ({ _id }) => {
  const { accessService } = useDeps();
  const [inputField, setInputField] = useState({
    taskDescription: '',
    uid: `${_id}`,
  });
  const inputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handleAddTodo = async () => {
    const accountId = localStorage.getItem('accountId');
    const token = localStorage.getItem('token');
    if (inputField.taskDescription != '') {
      try {
        let response = await accessService.addTodo(
          accountId,
          inputField.taskDescription,
          token,
          );
        console.log(response);
        if (response.request.status === 201) {
          toast.success('Added Successfully');
        }
      } catch (e) {
        toast.error('Error!Unable to add');
      }
    } else {
      toast.error('Error! Task is Empty');
    }
  };
  return (
    <div className="todoinput-container">
      <div className="todo-input-item">
        <label htmlFor="description">Discription</label>
        <input
          type="text"
          placeholder="Description of task"
          name="taskDescription"
          id="description"
          value={inputField.taskDescription}
          onChange={inputHandler}
        ></input>
        {/* {errField.taskDescriptionErr.length > 0 && (
              <span className="span">{errField.taskDescriptionErr}</span>
            )} */}
      </div>
      <div className="todoinput-button">
        <button onClick={handleAddTodo}>Addd</button>
      </div>
    </div>
  );
};
export default TodoInput;
