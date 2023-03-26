import { useState } from 'react';
import Note from './Note'

function Notelist(props) {
  var {view,noteList,setNoteList,setTargetNote} = props;
  var [title,setTitle] = useState("on");

  const tagRemover = (id,delTag)=>{
    var changedNote = noteList.filter((note)=>note.id==id);

    changedNote[0].tags = changedNote[0].tags.filter((tag)=>tag!==delTag);

    var updatedList = noteList.map((note)=>{
      if(note.id!=id){
        return note;
      }
      else{
        return changedNote[0];
      }
    });
    setNoteList(updatedList);
  }

  const noteRemover = (id)=>setNoteList(noteList.filter((note)=>note.id!=id));

  const checkUpdate = (id,idx,cked)=>{
    var newNote = noteList.filter((note)=>note.id==id);
    newNote[0].checkList[parseInt(idx)]=cked;
    var updatedList = noteList.map((note)=>{
      if(note.id==id){
        return newNote[0];
      }
      else{
        return note;
      }
    });
    setNoteList(updatedList);
  }

  const updatePin = (noteId,bool) => {
    setNoteList(noteList.map((note)=>{
      if(note.id==noteId){
        note.pinned=bool;
        return note;
      }
      else{
        return note;
      }
    }));
  }

  const titleSet = () =>{
    if(document.getElementsByClassName("pinnedList")[0].children.length!=0){
      setTitle("on")
    }
    else{
      setTitle("off")
    }
  }

  return (
    <div className="pinnedAndUnpinned" style={{alignItems:`${view==="grid"?"flex-start":"center"}`,marginLeft:`${view==="grid"?"150px":"0px"}`}} onLoad={titleSet}>
      <div>
        <span className="listSectionTitle">
          {
            title=="on"?"Other":""
          }
        </span>
        <div className={`noteList ${view==="grid"?"":"listView"}`}>
          {
            noteList.map((note)=>{
              if(!note.pinned){
                return <Note key={note.id} note={note} tagRemover={tagRemover} noteRemover={noteRemover} checkUpdate={checkUpdate} setTargetNote={setTargetNote} updatePin={updatePin}/>
              }
            })
          }
        </div>
      </div>
      <div>
        <span className="listSectionTitle">
          {
            title=="on"?"Pinned":""
          }
        </span>
        <div className={`noteList pinnedList ${view==="grid"?"":"listView"}`}>
          {
            noteList.map((note)=>{
              if(note.pinned){
                return <Note key={note.id}  note={note} tagRemover={tagRemover} noteRemover={noteRemover} checkUpdate={checkUpdate} setTargetNote={setTargetNote} updatePin={updatePin}/>
              }
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Notelist