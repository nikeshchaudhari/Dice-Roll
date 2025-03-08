import { useState } from "react";
import '../App.css'

const Todo = () => {
  const [inputText, setinputText] = useState("");

  return (
    <>
      <div className="input-container">
        <input
          type="text"
          className="input-box"
          placeholder="Enter Your Todo"
          onChange={e=>{
            setinputText(e.target.value)
          }}
        ></input>
        <button className="add-btn">+</button>
        <div>{inputText}</div>
      </div>
    </>
  );
};
export default Todo;
