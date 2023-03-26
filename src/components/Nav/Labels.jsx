import React from 'react'
import NavItem from './NavItem'

function Labels(props) {
  return (
    <div className='lables'>
        {props.labelList.map((label)=>{
            return <NavItem key={label} icon={"fa-solid fa-hashtag"} tag={label} styl={props.styl}/>
        })}
    </div>
  )
}

export default Labels;