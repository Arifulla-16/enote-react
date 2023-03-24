import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav/Nav';
import Notelist from './components/Notes/Notelist';
import Takenote from './components/Notes/Takenote';

function App() {
  var [noteList,setNoteList] = useState([
    {
      "id":1,
      "title":"Abc",
      "text":"Done in the of king",
      "list":[],
      "checkList":[],
      "tags":["study","done"],
      "images":["3","1"]
    },
    {
      "id":2,
      "title":"Def",
      "text":"",
      "list":["hulu","crunch","me"],
      "checkList":[true,false,false],
      "tags":["science","home"],
      "images":["4","2"]
    },
    {
      "id":3,
      "title":"Ghi",
      "text":"Not mine",
      "list":[],
      "checkList":[],
      "tags":["misc","home"],
      "images":["1","2"]
    }
  ]);
  var [idx,setIdx] = useState(3);
  var [navMode,setNavMode] = useState(0);
  const navToggler = ()=>{
    navMode===0?setNavMode(1):setNavMode(0);
  }
  var [view,setView] = useState("grid");
  const getView = (retView)=>{
    setView(retView);
  }

  const updateNoteList = (list) =>{
    setNoteList(list);
  }

  const addNewNote = (note) =>{
    note.id=idx+1;
    note.images = [`${(idx%4)+1}`,`${((idx+1)%4)+1}`];
    setIdx(idx+1);
    var upList = noteList.slice();
    upList.push(note);
    setNoteList(upList);
    console.log(noteList);
  }


  return (
    <div>
      <Header navToggler={navToggler} getView={getView}/>
      <span className="content" id="content">
        <Nav navMode={navMode}/>
        <span className={`nonNav nonNavToggleClass${navMode} `}>
          <Takenote addNewNote={addNewNote}/>
          <Notelist view={view} noteList={noteList} setNoteList={updateNoteList}/>
        </span>
      </span>
    </div>
  );
}

export default App;
