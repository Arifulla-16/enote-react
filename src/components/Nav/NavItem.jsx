import React from 'react'

function NavItem(props) {
    let {icon,tag,styl} = props;
  return (
    <div className='navItem'>
        <span className="navIcon">
        <i className={`${icon} fa-xl`}></i>
        </span>
        <span className={`navTag ${styl===1?"hideTag":""}`}>
        {tag}
        </span>
    </div>
  )
}

export default NavItem;