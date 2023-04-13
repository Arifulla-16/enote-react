import React, { useState , useEffect } from 'react'
import NavItem from './NavItem'
import { Link ,useLocation} from "react-router-dom";

function Labels(props) {
  var [high,setHigh] = useState(useLocation().pathname);

  useEffect(()=>{
    setHigh(window.location.pathname);
  },[useLocation().pathname]);

  return (
    <div className='lables'>
        {props.labelList.map((label)=>{
            return (
              <Link key={label} to={`/tags/${label}`}>
                <NavItem icon={"fa-solid fa-hashtag"} tag={label} styl={props.styl} hig={!high.includes("/tags")?high.slice(1):high.slice(6)} />
              </Link>
            )
        })}
    </div>
  )
}

export default Labels;