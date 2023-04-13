import React from 'react'

function NavItem(props) {
    let {icon,tag,styl,hig} = props;
    if(hig==""){
      hig="notes";
    }
  return (
    <div className={`navItem ${tag.toLowerCase()==hig.toLowerCase()?"navItHovClassPer":"navItHovClass" }`}>
        <span className="navIcon">
        <span className={`icAni ${tag.toLowerCase()==hig.toLowerCase()?"icAniPer":"" }`}>
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