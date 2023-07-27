import React from 'react'

function NavItem(props) {
    let {icon,tag,styl,hig,shwr} = props;
    if(hig==""){
      hig="notes";
    }
  return (
    <div className={`navItem navItHovClass ${tag.toLowerCase()==hig.toLowerCase()?"navItHovClassPer":"" }`} onClick={shwr}>
        <span className="navIcon">
        <span className={`icAni ${tag.toLowerCase()==hig.toLowerCase()?"icAniPer":"" }`}>
        <i className={`${icon} fa-xl`}></i>
        </span>
        </span>
        <span className={`navTag ${styl===1?"hideTag":""}`}>
        {
          tag.length>12?tag.substring(0,12)+"...":tag
        }
        </span>
    </div>
  )
}

export default NavItem;