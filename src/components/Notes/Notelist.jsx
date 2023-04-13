import { useEffect, useState } from 'react';
import Note from './Note'
import { useLocation } from 'react-router-dom';

function Notelist(props) {
  var {view,noteList,setNoteList,setTargetNote,mergeLists,tp,del,res} = props;
  var [title,setTitle] = useState("on");

  if(tp!="trash" && tp!="note"){
    var loc= window.location.pathname.slice(6);
    noteList=noteList.filter(note=>note.tags.includes(loc));
  }  

  useEffect(()=>{
  },[useLocation().pathname])

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

  const restore = (id)=>{
    res(id);
  }

  const deleteForever = (id)=>{
      del(id);
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
    console.log(noteId,bool);
    var note = noteList.filter((note)=>note.id==noteId)[0];
    note.pinned=bool;
    console.log(note);
    setNoteList(note,"up");
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
                return <Note key={note.id} note={note} tagRemover={tagRemover} noteRemover={noteRemover} checkUpdate={checkUpdate} setTargetNote={setTargetNote} updatePin={updatePin} psy={"p"} noteArchive={noteArchive} imgAdd={imgAdd} tp={tp} del={deleteForever} res={restore} />
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
                return <Note key={note.id}  note={note} tagRemover={tagRemover} noteRemover={noteRemover} checkUpdate={checkUpdate} setTargetNote={setTargetNote} updatePin={updatePin} psy={"unp"} noteArchive={noteArchive} imgAdd={imgAdd} tp={tp} del={deleteForever} res={restore}/>
              }
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Notelist