import React from 'react'
import Note from './Note'

function Notelist(props) {
  return (
    <div className={`noteList ${props.view==="grid"?"":"listView"}`}>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
        <Note/>
    </div>
  )
}

export default Notelist