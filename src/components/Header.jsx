import React, { useState } from 'react'

function Header(props) {
  var [view,setView] = useState("list");
  const toggleView = ()=>{
    view==="grid"?setView("list"):setView("grid");
    props.getView(view);
  };

  var [serchBarVisibility,setVisibility] = useState("hidden");
  const toggleSearchBar=()=>{
    serchBarVisibility==="hidden"?setVisibility("show"):setVisibility("hidden");
  }
  return (
    <div className='header'>
        <span className="menuToggle">
          {/* icon */}
          <span className='icAni' onClick={props.navToggler}>
            <i className="fa-solid fa-bars fa-xl " ></i>
          </span>
        </span>
        <span className="appTitle">
          Enote
        </span>
        <span className="search">
          <span className={`serchBar ${serchBarVisibility==="hidden"?"hideSearch":""}`}>
            <i className={`fa-solid fa-arrow-left fa-xl arrow`} onClick={toggleSearchBar}></i>
            <input type="search" name="searchBar" id="searchBar" placeholder='Search' />
          </span>
          <i className="fa-solid fa-magnifying-glass  fa-xl" onClick={toggleSearchBar}></i>
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