import React, { useState } from 'react'
import Labels from './Labels';
import NavItem from './NavItem';

function Nav(props) {
  let lables = ["Home","Office","Sport"] ;
  return (
    <div className={`nav navToggleClass${props.navMode} `}>
        <NavItem icon={"fa-regular fa-lightbulb"} tag={"Notes"} styl={props.navMode}/>
        <Labels labelList={lables} styl={props.navMode}/>
        <NavItem icon={"fa-solid fa-pen"} tag={"Edit labels"} styl={props.navMode}/>
        <NavItem icon={"fa-solid fa-archive"} tag={"Archive"} styl={props.navMode}/>
        <NavItem icon={"fa-solid fa-trash"} tag={"Trash"} styl={props.navMode}/>
    </div>
  )
}

export default Nav;