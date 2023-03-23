import React from 'react'

function NavItem(props) {
    let {icon,tag,styl} = props;
  return (
    <div className='navItem navItHovClass'>
        <span className="navIcon">
        <span className="icAni ">
        <i className={`${icon} fa-xl`}></i>
        </span>
        </span>
        <span className={`navTag ${styl===1?"hideTag":""}`}>
        {tag}
        </span>
    </div>
  )
}

export default NavItem;