import React, { useState } from "react";
import "../componet/Style.css";
const Counter = () => {
  const [Number, setNumber] = useState(0);

  return (
    <>
      <h1>Counter : {Number}</h1>
      <button
        onClick={() => {
          if (Number < 10) {
            setNumber(Number + 1);
          }
        }}
        className="button"
      >
        Add
      </button>
      <button
        onClick={() => {
          if(Number>-10){
            setNumber(Number -1)
          }
        }}
        className="button"
      >
        Less
      </button>
      <button
        onClick={() => {
          setNumber(0);
        }}
        className="button"
      >
        Reset
      </button>
    </>
  );
};

export default Counter;
