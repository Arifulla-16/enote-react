import { useRef, useState,useEffect,useCallback } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes , Route} from "react-router-dom";
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
      "images":[],
      "bgImage":"https://www.gstatic.com/keep/backgrounds/notes_light_thumb_0615.svg",
      "bgColor":"#ccff90",
      "pinned":true,
      "archived":false
    },
    {
      "id":2,
      "title":"Def",
      "text":"",
      "list":["hulu","crunch","me"],
      "checkList":[true,false,false],
      "tags":["science","home"],
      "images":[],
      "bgImage":"none",
      "bgColor":"#fccfe9",
      "pinned":false,
      "archived":true
    },
    {
      "id":3,
      "title":"Ghi",
      "text":"Not mine",
      "list":[],
      "checkList":[],
      "tags":["misc","home"],
      "images":[],
      "bgImage":"none",
      "bgColor":"#a6feeb",
      "pinned":false,
      "archived":false
    }
  ]);
  var [trashList,setTrashList] = useState([
    {
      "id":100,
      "title":"JIoa",
      "text":"ikiedk sjdnksm amsdm",
      "list":["hulu","crunch","me"],
      "checkList":[true,false,false],
      "tags":["science","home"],
      "images":[],
      "bgImage":"none",
      "bgColor":"#fccfe9",
      "pinned":false,
      "archived":true
    }
  ]);
  var tId = useRef("");
  var temp = useRef("") ;
  var arr = useRef([]);
  var [allTagList,setAllTagList] = useState(["study","done","science","home","misc","new","note","one"]);
  var [idx,setIdx] = useState(3);
  var [navMode,setNavMode] = useState(0);
  var [targetNote,setTargetNote] = useState("TNT");
  var [view,setView] = useState("grid");
  var [filteredList,setFilteredList] = useState([...allTagList]);
  var [searchVal,setSearchVal] = useState("");
  var [reqArr,setReqArr] =useState([]);
  var [curTags,setCurTags] = useState([]);
  var editVal = useRef("");
  var [targetEditTag,setTargetEditTag]=useState("");

  const navToggler = ()=>{
    navMode===0?setNavMode(1):setNavMode(0);
  }

  const deleteTagsAll = (e)=>{
    var tarTg = e.currentTarget.getAttribute("tg");
    var newList = [...noteList];
    setNoteList(newList.map((note)=>{
        if(note.tags.includes(tarTg)){
          note.tags.splice(note.tags.indexOf(tarTg),1);
        }
        return note;
      }));
    newList = [...trashList];
    setTrashList(newList.map((note)=>{
      if(note.tags.includes(tarTg)){
        note.tags.splice(note.tags.indexOf(tarTg),1);
      }
      return note;
    }));
    newList= [...allTagList];
    newList.splice(newList.indexOf(tarTg),1)
    setAllTagList(newList);
    e.stopPropagation();
  }

  const editTagsAll = (e) =>{
    var tarTg = e.currentTarget.getAttribute("tg");
    if(targetEditTag!=""){
      console.log("kjcidadolacl,ca;s,c;sa,c;ac,alscmkamdcaldmvsdlm");
      document.getElementById(`${targetEditTag}NavELablesItemName`).style.display="inline";
      document.getElementById(`${targetEditTag}LabelEdit`).style.display="none";
      document.getElementById(`${targetEditTag}NavELablesItemPen`).style.display="inline";
      document.getElementById(`${targetEditTag}NavELablesItemTick`).style.display="none";
    }
    setTargetEditTag(tarTg);
    var box = document.getElementById(`${tarTg}LabelEdit`);
    var tg = document.getElementById(`${tarTg}NavELablesItemName`);
    var tk = document.getElementById(`${tarTg}NavELablesItemTick`);
    var pen = document.getElementById(`${tarTg}NavELablesItemPen`);
    // setEVal(tg.innerText);
    editVal.current=tg.innerText;
    box.style.display="inline";
    box.focus();
    box.value=editVal.current;
    tg.style.display="none";
    tk.style.display="inline";
    pen.style.display="none";
    console.log(editVal.current,box.getAttribute("value"));
    e.stopPropagation();
  }

  const applyEditAll = (e)=>{
    var tarTg = e.currentTarget.getAttribute("tg");
    var box = document.getElementById(`${tarTg}LabelEdit`);
    var prevName = document.getElementById(`${tarTg}NavELablesItemName`);
    var tk = document.getElementById(`${tarTg}NavELablesItemTick`);
    var pen = document.getElementById(`${tarTg}NavELablesItemPen`);
    
    if(allTagList.indexOf(editVal.current)==-1){
      replaceNoteListLabels(editVal.current,prevName.innerText);
      var newTagList=allTagList;
      newTagList.splice(newTagList.indexOf(prevName.innerText),1,editVal.current);
      prevName.innerText=editVal.current;
      setAllTagList(newTagList);
      setFilteredList(newTagList);
    }
    else{
      alert("tag Already exists");
    }
    prevName.style.display="inline";
    box.value="";
    box.style.display="none";
    tk.style.display="none";
    pen.style.display="inline";
    setTargetEditTag("");
    e.stopPropagation();
  }

  const addNewLabel = (e)=>{
    if(allTagList.indexOf(editVal.current)==-1){
      var nList=allTagList.slice();
      nList.push(editVal.current);
      setAllTagList(nList);
    }
    else{
      alert("tag Already exists");
    }
    document.getElementById("labelAdd").value="";
  }

  const replaceNoteListLabels = (present,past)=>{
    var nList = noteList;
    nList.map((note)=>{
       note.tags.splice(note.tags.indexOf(past),1,present);
       return note;
    });
    setNoteList(nList);
    nList=trashList;
    nList.map((note)=>{
      note.tags.splice(note.tags.indexOf(past),1,present);
      return note;
   });
   setTrashList(nList);
  }

  const getView = (retView)=>{
    setView(retView);
  }

  const updateNoteList = (list,typ) =>{
    if(typ=="del"){
      setTrashList([...trashList,noteList.filter(note => note.id==list[0].id)[0]]);
      setNoteList(noteList.filter(note => note.id!=list[0].id));
    }
    else if(typ=="tdel" || typ=="ck" || typ=="img"|| typ=="up"){
      setNoteList(noteList.map(note => {
        if(note.id==list.id){
          return list;
        }
        return note;
      }))
    }
  }

  const restore = (id)=>{
    setNoteList([...noteList,(trashList.filter(note => note.id==id)[0])]);
    setTrashList(trashList.filter(note => note.id!=id));
  }

  const deleteForever = (id)=>{
    setTrashList(trashList.filter(note => note.id!=id));
  }

  const addNewNote = (note) =>{
    note.id=idx+1;
    // note.images = [`${(idx%4)+1}`,`${((idx+1)%4)+1}`];
    // `${(idx%4)+1}`,`${((idx+1)%4)+1}`
    setIdx(idx+1);
    var upList = noteList.slice();
    upList.push(note);
    setNoteList(upList);
  }

  const setColor = (e) => {
    var color = e.target.attributes["style"].value.slice(18).slice(0,-1);
    if(targetNote=="TNT"){
      var target = document.querySelector(".takeNoteOptions");
      target.style.backgroundColor=color;
    }
    else{
      var newList = noteList.map((note)=>{
        if(note.id==targetNote){
          note.bgImage = "none";
          note.bgColor = color;
          return note;
        }
        else{
          return note;
        }
      });
      setNoteList(newList);
    }
  }

  const setImg = (e) => {
    var img = e.target.attributes["src"].value;
    img == "https://fonts.gstatic.com/s/i/googlematerialicons/image_not_supported/v12/gm_grey-24dp/1x/gm_image_not_supported_gm_grey_24dp.png"?img="none":img='url('.concat(img).concat(')');
    if(targetNote=="TNT"){
      var target = document.querySelector(".takeNoteContainer");
      target.style.backgroundImage=img;
    }
    else{
      var newList = noteList.map((note)=>{
        if(note.id==targetNote){
          note.bgImage = img;
          return note;
        }
        else{
          return note;
        }
      });
      setNoteList(newList);
    }
  }

  const handleCheck = (e) => {
    var tag = e.target.attributes["tag"].value;
    if(targetNote=="TNT"){
      var newTgs = [...curTags];
      e.target.checked!==true?newTgs.splice(newTgs.indexOf(tag),1):newTgs.push(tag);
      setCurTags(newTgs);
    }
    else{
      var newList;
      newList = noteList.map((note)=>{
        if(note.id==targetNote){
          {e.target.checked!==true?note.tags.splice(note.tags.indexOf(tag),1):note.tags.push(tag)};
          return note;
        }
        else{
          return note;
        }
      });
      setNoteList(newList);
    }
    e.stopPropagation();
  }

  const setSerVal = () =>{
    setSearchVal(tId.current.value);
    arrayMaker();
    filterTags();
  }

  const setEditValue = (e) =>{
    editVal.current = e.target.value;
  }

  const arrayMaker = useCallback(()=>{
    var taags = Array.from(document.getElementsByClassName("noteLabels"));
    var taggs;
    taags.forEach((el)=>{
        if(el.attributes["uid"].value==temp.current){
            taggs=el;
        }
    });
    var reqArray = [];
    if(taggs!==undefined){
      Array.from(taggs.children).forEach((c)=>{
          reqArray = [c.children[0].innerText,...reqArray];
      });
    }
    setReqArr(reqArray);
  },[]);

  const filterFunction = useCallback (() => {
      var palette = document.getElementById("editLabels");
      var checks = palette.querySelectorAll(".editLabelsList>span");
      checks.forEach((child)=>{
          var ar = Array.from(child.children);
          ar.forEach((c,idx)=>{
              if(c.checked!=undefined && arr.current.includes(ar[idx+1].innerText)){
                  c.checked=true;
              }
              else if(c.checked!=undefined){
                  c.checked=false;
              }
          });
      });
  },[]);

  const filterTags = () => {
    var tagList = allTagList.filter((tag)=>{
      return (tag.includes(tId.current.value));
    });
    setFilteredList(tagList);
  }

  const tagRemover = (tg)=>{
    if(typeof(tg)=="boolean"){
      setCurTags([]);
    }
    else{
      var nTags = [...curTags];
      nTags.splice(nTags.indexOf(tg),1);
      setCurTags(nTags);
    }
  }

  useEffect(()=>{
    filterFunction();
  },[filteredList,filterFunction]);

  useEffect(()=>{
    temp.current=targetNote;
    arrayMaker();
  },[targetNote,arrayMaker]);

  useEffect(()=>{
    arr.current=reqArr;
  },[reqArr]);

  useEffect(()=>{
    if(targetNote=="TNT")
      arr.current=curTags;
  },[curTags]);

  useEffect(()=>{
    setCurTags([...curTags]);
  },[]);

  document.addEventListener('click', (e)=>{
    var palette = document.getElementById("palette");
    var editLabels = document.getElementById("editLabels");
    if(palette.style.display !== 'none'){
      palette.style.display = 'none';
    }
    if(editLabels.style.display !== 'none'){
      editLabels.style.display = 'none';
    }
    e.stopPropagation();
  });

  const mergeLists = (lid,bl) =>{
    var list = noteList.map((note)=>{
      if(note.id==lid){
        note.archived=bl;
      }
      return note;
    })
    setNoteList(list);
  }

  return (
    <div>
    <Router>
        <span className="colorImg" id="palette">
          <span className="colorPalette palette">
            <span className="roundOff" onClick={setColor} id="none" style={{backgroundColor : "#ffffff"}}></span>
            <span className="roundOff" onClick={setColor} id="red" style={{backgroundColor : "#f38a82"}}></span>
            <span className="roundOff" onClick={setColor} id="orange" style={{backgroundColor : "#fbbc04"}}></span>
            <span className="roundOff" onClick={setColor} id="yellow" style={{backgroundColor : "#fef575"}}></span>
            <span className="roundOff" onClick={setColor} id="green" style={{backgroundColor : "#ccff90"}}></span>
            <span className="roundOff" onClick={setColor} id="teal" style={{backgroundColor : "#a6feeb"}}></span>
            <span className="roundOff" onClick={setColor} id="blue" style={{backgroundColor : "#cbf1f9"}}></span>
            <span className="roundOff" onClick={setColor} id="darkBlue" style={{backgroundColor : "#afcafa"}}></span>
            <span className="roundOff" onClick={setColor} id="purple" style={{backgroundColor : "#d7affa"}}></span>
            <span className="roundOff" onClick={setColor} id="pink" style={{backgroundColor : "#fccfe9"}}></span>
            <span className="roundOff" onClick={setColor} id="brown" style={{backgroundColor : "#e6c8a9"}}></span>
            <span className="roundOff" onClick={setColor} id="gray" style={{backgroundColor : "#e9ebed"}}></span>
          </span>
          <span className="imgPalette palette">
            <img alt="noImg" onClick={setImg} className="imgsvg roundOff" src="https://fonts.gstatic.com/s/i/googlematerialicons/image_not_supported/v12/gm_grey-24dp/1x/gm_image_not_supported_gm_grey_24dp.png"/>
            <img alt="grocery" onClick={setImg} className="imgsvg roundOff" src="https://www.gstatic.com/keep/backgrounds/grocery_light_thumb_0615.svg"/>
            <img alt="food" onClick={setImg} className="imgsvg roundOff" src="https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg"/>
            <img alt="music" onClick={setImg} className="imgsvg roundOff" src="https://www.gstatic.com/keep/backgrounds/music_light_thumb_0615.svg"/>
            <img alt="recipe" onClick={setImg} className="imgsvg roundOff" src="https://www.gstatic.com/keep/backgrounds/recipe_light_thumb_0615.svg"/>
            <img alt="notes" onClick={setImg} className="imgsvg roundOff" src="https://www.gstatic.com/keep/backgrounds/notes_light_thumb_0615.svg"/>
            <img alt="places" onClick={setImg} className="imgsvg roundOff" src="https://www.gstatic.com/keep/backgrounds/places_light_thumb_0615.svg"/>
            <img alt="travel" onClick={setImg} className="imgsvg roundOff" src="https://www.gstatic.com/keep/backgrounds/travel_light_thumb_0615.svg"/>
            <img alt="video" onClick={setImg} className="imgsvg roundOff" src="https://www.gstatic.com/keep/backgrounds/video_light_thumb_0615.svg"/>
            <img alt="celebration" onClick={setImg} className="imgsvg roundOff" src="https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg"/>

          </span>
        </span>
        <span className="editLabels" id="editLabels" onClick={(e)=>{e.stopPropagation()}}>
          <span className="editLabelsTitle"> Edit Labels </span>
          <span className="editLabelsInput">
            <input type="text" name="labelSearch" id="labelSearch" placeholder="Enter label name" autoComplete="off" ref={tId} onChange={setSerVal} value={searchVal} />
            <i className="fa-solid fa-magnifying-glass labelSearchIcon"></i>
          </span>
          <span className="editLabelsList">
            {
              filteredList.map((tag)=>{
                return (<span key={tag} className="editLabelsItem">
                          <input type="checkbox" tag={tag} className="editLabelsItemCheck" onChange={handleCheck} name="labelInclusion" id="labelInclusion" />
                          <span className="editLabelsItemName" chk="false">{tag}</span>
                        </span>)
              })
            }
          </span>
        </span>
        <span className="navELablesCont" id="navELablesCont" >
          <span className="navELables" id="navELables" onClick={(e)=>{e.stopPropagation()}}>
            <span className="navELablesInput">
              <i className="fa-solid fa-xmark curs" id="navELablesClose" onClick={()=>{document.getElementById("navELablesCont").style.display = "none"}} ></i>
              <input type="text" name="labelAdd" id="labelAdd" placeholder="Create a label" autoComplete="off" onClick={(e)=>{e.stopPropagation()}} onChange={setEditValue} />
              <i className="fa-solid fa-check curs" onClick={addNewLabel} ></i>
            </span>
            <span className="navELablesList">
              {
                allTagList.map((tag)=>{
                  return (<span key={tag} className="navELablesItem">
                            <i className="fa-solid fa-hashtag navELablesItemTg1 curs"></i>
                            <i className="fa-solid fa-trash navELablesItemTg2 curs" onClick={deleteTagsAll} tg={tag}></i>
                            <span className="navELablesItemName" id={`${tag}NavELablesItemName`} onClick={(e)=>{e.stopPropagation()}} >{tag}</span>
                            <input type="text" name="labelEdit" className='labelEdit' id={`${tag}LabelEdit`} autoComplete="off" onClick={(e)=>{e.stopPropagation()}} onChange={setEditValue}  />
                            <i className="fa-solid fa-pen curs navELablesItemPen" id={`${tag}NavELablesItemPen`} onClick={editTagsAll} tg={tag}></i>
                            <i className="fa-solid fa-check curs navELablesItemTick" id={`${tag}NavELablesItemTick`} onClick={applyEditAll} tg={tag}></i>
                          </span>)
                })
              }
            </span>
          </span>
        </span>
      <Header navToggler={navToggler} getView={getView}/>
      <span className="content" id="content">
        <Nav navMode={navMode} allTagList={allTagList}  />
        <span className={`nonNav nonNavToggleClass${navMode} `}>
        <Routes>
        <Route 
          path='/'
          element={
            <>
              <Takenote addNewNote={addNewNote} setTargetNote={setTargetNote} curTags={curTags} tagRemover={tagRemover} />
              <Notelist view={view} noteList={noteList.filter((note)=>note.archived==false)} setNoteList={updateNoteList} setTargetNote={setTargetNote} mergeLists={mergeLists} tp={"note"} del={deleteForever} res={restore} />
            </>
          }

          />
        <Route 
          path='/archive'
          element={
              <Notelist view={view} noteList={noteList.filter((note)=>note.archived==true)} setNoteList={updateNoteList} setTargetNote={setTargetNote} mergeLists={mergeLists} tp={"note"} del={deleteForever} res={restore} />
          } />
        <Route 
          path='/trash'
          element={
              <Notelist view={view} noteList={trashList} setNoteList={updateNoteList} setTargetNote={setTargetNote} mergeLists={mergeLists} tp={"trash"} del={deleteForever} res={restore}/>
          } />
          {
            allTagList.map((tag)=>{
              return (
                <Route
                key={tag}
                path='/tags/:tag'
                element={
                  <>
                    <Takenote addNewNote={addNewNote} setTargetNote={setTargetNote} curTags={curTags} tagRemover={tagRemover} />
                    <Notelist view={view} noteList={noteList} setNoteList={updateNoteList} setTargetNote={setTargetNote} mergeLists={mergeLists} tp={"tag"} del={deleteForever} res={restore}/>
                  </>
                } />
              )
            })
          }
        </Routes>
        </span>
      </span>
    </Router>
    </div>
  );
}

export default App;
