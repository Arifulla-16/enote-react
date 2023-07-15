import React, { useState,useEffect } from 'react'
import { Link ,useLocation} from "react-router-dom";

function Header(props) {
  var [view,setView] = useState("list");
  const toggleView = ()=>{
    view==="grid"?setView("list"):setView("grid");
    props.getView(view);
  };

  var [serchBarVisibility,setVisibility] = useState("hidden");
  var [appName,setAppName]=useState(useLocation().pathname);

  useEffect(()=>{
    setAppName(window.location.pathname);
  },[useLocation().pathname]);

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
          {
            !appName.includes("/tags")?(appName.slice(1)==""?"Enote":appName.slice(1).charAt(0).toUpperCase()+appName.slice(1).substring(1)):(appName.slice(6).charAt(0).toUpperCase()+appName.slice(6).substring(1))
          }
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