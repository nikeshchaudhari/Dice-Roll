import React, { useState } from "react";

const App = () => {
  const [diceNumber, setdiceNumber] = useState(1);
  const refreshDice = () => {
    const random = Math.floor(Math.random() * 6) + 1;
    setdiceNumber(random);
  };

  return (
    <div>
      <img src={require(`./assets/${diceNumber}.png`)}></img>
      <br></br>
      <button onClick={()=>{
        refreshDice()
      }}>Roll</button>
    </div>
  );
};

export default App;
