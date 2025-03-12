import React, { useState } from 'react'

const Dice = () => {
    const [diceNumber,setdiceNumber]=useState(1)
  return (
    <div>
     <img src={require(`./assets/${diceNumber}`)}></img>
     <button>Roll</button>
    </div>
  )
}

export default Dice
