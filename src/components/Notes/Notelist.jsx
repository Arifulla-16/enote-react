import { useEffect, useState } from 'react';
import Note from './Note'

function Notelist(props) {
  var {view,noteList,setNoteList,setTargetNote,mergeLists} = props;
  var [title,setTitle] = useState("on");

  const tagRemover = (id,delTag)=>{
    var changedNote = noteList.filter((note)=>note.id==id);

    changedNote[0].tags = changedNote[0].tags.filter((tag)=>tag!==delTag);

    setNoteList(changedNote[0],"tdel");
  }

  const titleSet = () =>{
    if(document.getElementsByClassName("pinnedList")[0].children.length!=0){
      setTitle("on")
    }
    else{
      setTitle("off")
    }
  }

  const imgAdd = (id,ig) =>{
    var changedNote = noteList.filter((note)=>note.id==id);

    changedNote[0].images.push(ig);
    setNoteList(changedNote[0],"img");
  }

  const noteArchive = (id,bl) =>{
    mergeLists(id,bl);
  }

  const noteRemover = (id)=>{
    setNoteList(noteList.filter((note)=>note.id==id),"del")
    titleSet();
  };

  useEffect(()=>{
    titleSet();
  },[title,titleSet]);

  const checkUpdate = (id,idx,cked)=>{
    var newNote = noteList.filter((note)=>note.id==id);
    newNote[0].checkList[parseInt(idx)]=cked;
    setNoteList(newNote[0],"ck");
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
                return <Note key={note.id} note={note} tagRemover={tagRemover} noteRemover={noteRemover} checkUpdate={checkUpdate} setTargetNote={setTargetNote} updatePin={updatePin} psy={"p"} noteArchive={noteArchive} imgAdd={imgAdd}/>
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
                return <Note key={note.id}  note={note} tagRemover={tagRemover} noteRemover={noteRemover} checkUpdate={checkUpdate} setTargetNote={setTargetNote} updatePin={updatePin} psy={"unp"} noteArchive={noteArchive} imgAdd={imgAdd}/>
              }
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Notelist