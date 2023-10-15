import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { List, Nav, TodoInput, ButtonArea } from '../../components';
import { useDeps } from '../../contexts';
import { useParams, Link } from 'react-router-dom';
import './dashboard.page.scss';

export default function Dashboard(): React.ReactElement {
  const navigate = useNavigate();
  const { _id } = useParams();

  const { accessService } = useDeps();
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);

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

    await accessService.markComplete(accountId, token, taskId, completedOn),
      console.log();
  };

  const handelDeleteTodo = async (index) => {
    const accountId = localStorage.getItem('accountId');
    const token = localStorage.getItem('token');
    const taskId = allTodos[index].id;
    let removeTodoArr = [...allTodos];
    removeTodoArr.splice(index, 1);
    let response = await accessService.deleteTodo(accountId, token, taskId);
    console.log(response);
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

      setTodos(response.data);
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

  const handleStorage = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Nav>
        <Link className="text-link" to="/login" onClick={handleStorage}>
          Logout
        </Link>
      </Nav>
      <div className="dashboard-content">
        <TodoInput _id={_id} />
        <div className="list-view">
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
                    isComplete={item.isComplete}
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
                    isComplete={item.isComplete}
                    deleteEvent={() => handelDeleteTodo(index)}
                    completeEvent={() => handleComplete(index)}
                    editEvent={() => handelEdit(index)}
                  />
                ) : null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
