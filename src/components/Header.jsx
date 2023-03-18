import React, { useState } from 'react'

function Header(props) {
  var [view,setView] = useState("grid");
  const toggleView = ()=>{
    view==="grid"?setView("list"):setView("grid");
    props.getView(view);
  };
  return (
    <div className='header'>
        <span className="menuToggle">
          {/* icon */}
          <span className='circler' onClick={props.navToggler}>
          <i className="fa-solid fa-bars fa-xl " ></i>
          </span>
        </span>
        <span className="appTitle">
          Enote
        </span>
        <span className="search">
        <i className="fa-solid fa-magnifying-glass  fa-xl"></i>
        </span>
        <span className="toggleView" onClick={toggleView}>
          <i className={`fa-solid fa-grip${view==="grid"?"":"-lines"} fa-xl`}></i>
        </span>
        <span className="profile">
        <span className='circler'>
        <i className="fa-regular fa-user fa-xl"></i>
        </span>
        </span>
    </div>
  )
}

export default Header;