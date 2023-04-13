import React, { useEffect, useState } from 'react'
import Labels from './Labels';
import { Link ,useLocation} from "react-router-dom";
import NavItem from './NavItem';

function Nav(props) {
  var [high,setHigh] = useState(useLocation().pathname);

  useEffect(()=>{
    setHigh(window.location.pathname);
  },[useLocation().pathname]);

  return (
    <div className={`nav navToggleClass${props.navMode} `}>
        <Link to="/">
        <NavItem icon={"fa-regular fa-lightbulb"} tag={"Notes"} styl={props.navMode} hig={!high.includes("/tags")?high.slice(1):high.slice(6)} />
        </Link>
        <Labels labelList={props.allTagList} styl={props.navMode}/>
        <NavItem icon={"fa-solid fa-pen"} tag={"Edit labels"} styl={props.navMode} hig={!high.includes("/tags")?high.slice(1):high.slice(6)} />
        <Link to="/archive">
        <NavItem icon={"fa-solid fa-archive"} tag={"Archive"} styl={props.navMode} hig={!high.includes("/tags")?high.slice(1):high.slice(6)} />
        </Link>
        <Link to="/trash">
        <NavItem icon={"fa-solid fa-trash"} tag={"Trash"} styl={props.navMode} hig={!high.includes("/tags")?high.slice(1):high.slice(6)} />
        </Link>
    </div>
  )
}

export default Nav;