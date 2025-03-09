import React from 'react'
import '../App.css'
const TodoList = (props) => {
  return (
   <>
   <div className='list-item'>
   {props.item}
    <button onClick={e=>{
        props.deleteItem(props.index)
    }}>-</button>
   </div>
   </>

)
}

export default TodoList
