import React from 'react';

interface ButtonAreaProps {
  handelTodoScreen: () => void;
  handelCompleteScreen: () => void;
}
const ButtonArea: React.FC<ButtonAreaProps> = ({
  handelTodoScreen,
  handelCompleteScreen,
}) => {
  const HandelTodoEvent = () => {
    handelTodoScreen();
  };
  const HandelCompleteEvent = () => {
    handelCompleteScreen();
  };
  return (
    <div className="buttonarea-container">
      <button onClick={HandelTodoEvent}>Todo</button>
      <button onClick={HandelCompleteEvent}>Complete</button>
    </div>
  );
};
export default ButtonArea;
