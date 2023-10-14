import React, { useState } from 'react';
import { useEffect } from 'react';

// import '../loginUser.css';
// import ButtonComp from './ButtonComp';
// import CompleteComp from './CompleteComp';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { List, Nav, TodoInput, ButtonArea } from '../../components';
import { useDeps } from '../../contexts';
import { useParams } from 'react-router-dom';
// interface TaskModel {
//   id: string;
//   account: string;
//   isComplete:string;
//   name: string;
//   active:string;

// }
export default function Dashboard(): React.ReactElement {
  const navigate = useNavigate();
  const { _id } = useParams();

  const { accessService } = useDeps();
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  // const [completedTodos, setCompletedTodos] = useState([]);

  // const [errField, setErrField] = useState({
  //   taskNameErr: '',
  //   taskDescriptionErr: '',
  // });


  const handleComplete = async (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ':' + s;

    const accountId = localStorage.getItem('accountId');
    const token = localStorage.getItem('token');
    const taskId = allTodos[index].id;

    //   if (response.data.updatedItem._id === allTodos[index]._id)
    //     toast.success('yeee! task Completed');
    //   else toast.error('Error ! Unable to Update Status');

    console.log(
      await accessService.markComplete(accountId, token, taskId, completedOn),
    );
  };

  // const handelDeleteCompleteTodo = async (index) => {
  //   let removeCompleteTodoArr = [...completedTodos];
  //   removeCompleteTodoArr.splice(index, 1);
  //   let response = await axios.delete(
  //     `http://localhost:4000/loginUser/delete/${completedTodos[index]._id}`,
  //   );
  //   setCompletedTodos(removeCompleteTodoArr);
  //   if (response.data.message === 'Todo deleted successfully')
  //     toast.success('Deleted Successfully');
  //   else toast.error('Error ! Unable to Deleted');
  // };

  const handelDeleteTodo = async (index) => {
    const accountId = localStorage.getItem('accountId');
    const token = localStorage.getItem('token');
    const taskId = allTodos[index].id;
    let removeTodoArr = [...allTodos];
    removeTodoArr.splice(index, 1);
    let response = await accessService.deleteTodo(accountId, token, taskId);
    console.log(response);

    // let response = await axios.delete(
    //   `http://localhost:4000/loginUser/delete/${allTodos[index]._id}`,
    // );
    // setTodos(removeTodoArr);
    // if (response.data.message === 'Todo deleted successfully')
    //   toast.success('Deleted Successfully');
    // else toast.error('Error ! Unable to Deleted');
    console.log(index);
  };

  const handelEdit = async (index) => {
    const accountId = localStorage.getItem('accountId');
    const token = localStorage.getItem('token');
    const taskId = allTodos[index].id;
    const description = prompt('Enter the Updated Description');
    const response = accessService.updateTask(
      accountId,
      token,
      taskId,
      description,
    );
    console.log(response);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await accessService.getAllTodos(_id, token);

      // console.log(response.data);
      // setTimeout(() => {
      //   console.log('Timeout finished!');  // Set a message after the timeout
      // }, 15000);
      setTodos(response.data);

      // if (response.status === 200) {
      //   setTodos(response.data.allTasks);
      //   const newArr = allTodos.map((item, index) => {
      //     //return item.isComplete !== 'NO' ? item : null;
      //   });
      //   setCompletedTodos(newArr);
      // }
    } catch (e) {
      toast.error('Error!Unable to Fetch');
    }
  };

  const handelTodoScreen = () => {
    setIsCompleteScreen(false);
  };

  const handelCompleteScreen = () => {
    setIsCompleteScreen(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  });
  useEffect(() => {
    fetchData();
  });

  return (
    <div className="App">
      <Nav>
        <button>Logout</button>
      </Nav>
      <TodoInput _id={_id} />
      <ButtonArea
        handelTodoScreen={() => handelTodoScreen()}
        handelCompleteScreen={() => handelCompleteScreen()}
      />
      <div>
        {isCompleteScreen === false &&
          allTodos.map((item, index) => {
            return item.active === 'true' && item.isComplete === 'false' ? (
              <List
                key={index}
                item={item.name}
                deleteEvent={() => handelDeleteTodo(index)}
                completeEvent={() => handleComplete(index)}
                editEvent={() => handelEdit(index)}
              />
            ) : null;
          })}
        {isCompleteScreen === true &&
          allTodos.map((item, index) => {
            return item.active === 'true' && item.isComplete !== 'false' ? (
              <List
                key={index}
                item={item.name}
                deleteEvent={() => handelDeleteTodo(index)}
                completeEvent={() => handleComplete(index)}
                editEvent={() => handelEdit(index)}
              />
            ) : null;
          })}
      </div>
    </div>
  );
}
