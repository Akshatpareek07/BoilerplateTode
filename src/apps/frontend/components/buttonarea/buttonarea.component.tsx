import React from 'react';
// import { useNavigate } from 'react-router-dom';
//import { useDeps } from '../../contexts';

interface ButtonAreaProps{
  handelTodoScreen:()=>void;
  handelCompleteScreen:()=>void;
}
const ButtonArea:React.FC<ButtonAreaProps>=({handelTodoScreen,handelCompleteScreen})=>{
  // allTodos:any[]
  const HandelTodoEvent=()=>{
    handelTodoScreen();
  }
  const HandelCompleteEvent=()=>{
  handelCompleteScreen();
}
    return (
      <div className='buttonarea-container'>
            {/* <ButtonComp
            class={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            event={() => setIsCompleteScreen(false)}
            toAdd="ToDo"
          />
          <ButtonComp
            class={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            event={() => setIsCompleteScreen(true)}
            toAdd="Complete"
          /> */}
          <button onClick={HandelTodoEvent}>Todo</button>
          <button onClick={HandelCompleteEvent}>Complete</button>
      </div>
  );
}
export default ButtonArea;