import React from 'react'

function Takenote() {
  return (
    <div className='takeNote'>
        <input type="text" name="takeNote" id="takeNote" placeholder='Take a Note...' />
        <span className="newList">
        <i className="fa-regular fa-square-check fa-xl"></i>
        </span>
    </div>
  )
}

export default Takenote;