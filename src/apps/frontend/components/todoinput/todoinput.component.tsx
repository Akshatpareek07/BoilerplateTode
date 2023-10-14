import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeps } from '../../contexts';

interface todoInputProps{
    _id:string
}
const TodoInput:React.FC<todoInputProps>=({_id})=>{
    const { accessService } = useDeps();
    const [inputField, setInputField] = useState({
        taskDescription: '',
        uid: `${_id}`,
      });
    const inputHandler = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value });
      };
    
      const handleAddTodo = async () => {
        
        const accountId=localStorage.getItem('accountId');
        const token=localStorage.getItem('token');
        
    
          try {
            let response = await accessService.addTodo(accountId, inputField.taskDescription, token);
            if (response.status === 200) {
            //   toast.success('Added Successfully');
    
              navigate(`/loginUser/${_id}`);
            }
          } catch (e) {
            // toast.error('Error!Unable to add');
          }
    } 
    const navigate = useNavigate();
    return (
      <div className='todoinput-container'>
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
          <div className="todo-input-button">
            <button onClick={handleAddTodo}>Addd</button>
            {/* <ButtonComp class="primaryBtn" event={handleAddTodo} toAdd="Add" /> */}
          </div>
      </div>
);
}
export default TodoInput;