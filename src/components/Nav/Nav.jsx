import React, { useState } from 'react'
import Labels from './Labels';
import { Link } from "react-router-dom";
import NavItem from './NavItem';

function Nav(props) {
  return (
    <div className={`nav navToggleClass${props.navMode} `}>
        <Link to="/">
        <NavItem icon={"fa-regular fa-lightbulb"} tag={"Notes"} styl={props.navMode}/>
        </Link>
        <Labels labelList={props.allTagList} styl={props.navMode}/>
        <NavItem icon={"fa-solid fa-pen"} tag={"Edit labels"} styl={props.navMode}/>
        <Link to="/archive">
        <NavItem icon={"fa-solid fa-archive"} tag={"Archive"} styl={props.navMode}/>
        </Link>
        <NavItem icon={"fa-solid fa-trash"} tag={"Trash"} styl={props.navMode}/>
    </div>
  )
}

export default Nav;