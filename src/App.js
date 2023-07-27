import { useRef, useState,useEffect,useCallback } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes , Route} from "react-router-dom";
import Header from './components/Header';
import Nav from './components/Nav/Nav';
import Api from './components/Api';
import Notelist from './components/Notes/Notelist';
import Takenote from './components/Notes/Takenote';
import { v4 as uuidv4 } from 'uuid';

function App() {
  var [noteList,setNoteList] = useState([]);
  // {
  //   "id":1,
  //   "title":"Abc",
  //   "text":"Done in the of king",
  //   "list":[],
  //   "checkList":[],
  //   "tags":["study","done"],
  //   "images":[],
  //   "bgImage":"https://www.gstatic.com/keep/backgrounds/notes_light_thumb_0615.svg",
  //   "bgColor":"#ccff90",
  //   "pinned":true,
  //   "archived":false
  // },
  // {
  //   "id":2,
  //   "title":"Def",
  //   "text":"",
  //   "list":["hulu","crunch","me"],
  //   "checkList":[true,false,false],
  //   "tags":["science","home"],
  //   "images":[],
  //   "bgImage":"none",
  //   "bgColor":"#fccfe9",
  //   "pinned":false,
  //   "archived":true
  // },
  // {
  //   "id":3,
  //   "title":"Ghi",
  //   "text":"Not mine",
  //   "list":[],
  //   "checkList":[],
  //   "tags":["misc","home"],
  //   "images":[],
  //   "bgImage":"none",
  //   "bgColor":"#a6feeb",
  //   "pinned":false,
  //   "archived":false
  // }
  var [trashList,setTrashList] = useState([]);
  var tId = useRef("");
  var temp = useRef("") ;
  var arr = useRef([]);
  var [allTagList,setAllTagList] = useState([]);
  // var [idx,setIdx] = useState(3);"study","done","science","home","misc","new","note","one"
  var [navMode,setNavMode] = useState(0);
  var [targetNote,setTargetNote] = useState("TNT");
  var [view,setView] = useState("grid");
  var [filteredList,setFilteredList] = useState([...allTagList]);
  var [fList,setFList] = useState([]);
  var [searchVal,setSearchVal] = useState("");
  var [reqArr,setReqArr] =useState([]);
  var [curTags,setCurTags] = useState([]);
  var editVal = useRef("");
  var [targetEditTag,setTargetEditTag]=useState("");
  var [isMobile, setIsMobile] = useState(false);
  var [addDisplay,setAddDisplay]=useState("none");
  // var [editId,setEditId]=useState(0);
  // var [func,setFunc]=useState();
 
const handleResize = () => {
  if (window.innerWidth < 700) {
      setIsMobile(true)
      setNavMode(1)
      setView("flex");
  } else {
      setIsMobile(false)
  }
}

setTimeout(()=>{
  if (window.innerWidth < 700) {
    setIsMobile(true)
    setNavMode(1)
    setView("flex");
  }
},100);

// create an event listener
useEffect(() => {
  window.addEventListener("resize", handleResize)
})

  useEffect(() => {
    Api.get("/notes").then((response) => {
      setNoteList(response.data);
    });
    Api.get("/trash").then((response) => {
      setTrashList(response.data);
    });
    Api.get("/tags").then((response)=>{
      setAllTagList(response.data);
      setFilteredList(response.data);
    })
  }, [])

  const asyncHandler = async(nList,ids)=>{
    await nList.forEach((note) => {
      ids.push(note.id);
      Api.put(`/notes/${note.id}`,note);
    });
  }
  const asynctrHandler = async(nList,ids)=>{
    await nList.forEach((note) => {
      ids.push(note.id);
      Api.put(`/trash/${note.id}`,note);
    });
  }
  const dbHandler = (nList)=>{
        var ids = [];
        asyncHandler(nList,ids).then(()=>{
          var list = noteList.slice();
          list = list.map((note)=>{
            if(ids.includes(note.id)){
              return nList.filter(nt=>nt.id===note.id)[0];
            }
            return note;
          })
          setNoteList(list);
        });
  }

  const trdbHandler = (nList)=>{
    var ids=[];
    asynctrHandler(nList,ids).then(()=>{
      var list = noteList.slice();
      list = list.map((note)=>{
        if(ids.includes(note.id)){
          return nList.filter(nt=>nt.id===note.id)[0];
        }
        return note;
      })
      setTrashList(list);
    });
  }

  const navToggler = (e)=>{
    var nav = document.getElementsByClassName("nav");
    var navTag = document.getElementsByClassName("navTag");
    if(isMobile){
      setNavMode(1);
      if(nav[0].classList.contains("mobileTrans")){
        nav[0].classList.remove("mobileTrans");
        nav[0].classList.add("navToggleClass1");
        Array.from(navTag).forEach((tag)=>{
          tag.classList.add("hideTag");
        });
      }
      else{
        nav[0].classList.add("mobileTrans");
        nav[0].classList.remove("navToggleClass1");
        Array.from(navTag).forEach((tag)=>{
          tag.classList.remove("hideTag");
        });
      }
    }
    else{
      navMode===0?setNavMode(1):setNavMode(0);
    }
    e.stopPropagation();
  }

  const deleteTagsAll = (e)=>{
    var tarTg = e.currentTarget.getAttribute("tg");
    var newList = [...noteList];
    var ids=[];
    newList=newList.map((note)=>{
      if(note.tags.includes(tarTg)){
        ids.push(note.id);
        note.tags.splice(note.tags.indexOf(tarTg),1);
      }
      return note;
    });
    if(ids.length>0){
      var nList=newList.filter((note)=>ids.includes(note.id));
      dbHandler(nList);
    }

    ids=[];
    newList = [...trashList];
    newList=newList.map((note)=>{
      if(note.tags.includes(tarTg)){
        ids.push(note.id);
        note.tags.splice(note.tags.indexOf(tarTg),1);
      }
      return note;
    });
    if(ids.length>0){
      var nList=newList.filter((note)=>ids.includes(note.id));
      trdbHandler(nList);
    }

    newList= [...allTagList];
    newList.splice(newList.indexOf(tarTg),1)
    Api.put("/tags",newList)
    .then(()=>{
      setAllTagList(newList);
      setFilteredList(newList);
    })
    e.stopPropagation();
  }

  const editTagsAll = (e) =>{
    var tarTg = e.currentTarget.getAttribute("tg");
    if(targetEditTag!=""){
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
    editVal.current="";
    e.stopPropagation();
  }

  const applyEditAll = (e)=>{
    var tarTg = e.currentTarget.getAttribute("tg");
    var box = document.getElementById(`${tarTg}LabelEdit`);
    var prevName = document.getElementById(`${tarTg}NavELablesItemName`);
    var tk = document.getElementById(`${tarTg}NavELablesItemTick`);
    var pen = document.getElementById(`${tarTg}NavELablesItemPen`);
    
    if(allTagList.indexOf(editVal.current)==-1 && editVal.current!==""){
      replaceNoteListLabels(editVal.current,prevName.innerText);
      var newTagList=allTagList;
      newTagList.splice(newTagList.indexOf(prevName.innerText),1,editVal.current);
      prevName.innerText=editVal.current;
      Api.put("/tags",newTagList).then((response)=>{
        setAllTagList(newTagList)
        setFilteredList(newTagList)
      })
      editVal.current=""
    }
    else if(editVal.current!==""){
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

  const createLabel=()=>{
    var nList = allTagList;
    nList.push(tId.current.value);
    var fl = [...filteredList];
    fl.push(tId.current.value);
      Api.put("/tags",nList)
    .then(()=>{
      setAllTagList(nList);
      setFilteredList(fl);
    })
    setAddDisplay("none");
  }

  const addNewLabel = (e)=>{
    if(allTagList.indexOf(editVal.current)==-1 && editVal.current!==""){
      var nList=allTagList.slice();
      nList.push(editVal.current);
      Api.put("/tags",nList)
    .then(()=>{
      setAllTagList(nList);
      setFilteredList(nList);
    })
    }
    else if(editVal.current!==""){
      alert("tag Already exists");
    }
    document.getElementById("labelAdd").value="";
    editVal.current=""
  }

  const replaceNoteListLabels = (present,past)=>{
    var nList = noteList;
    var ids = [];
    nList=nList.map((note)=>{
      if(note.tags.indexOf(past)!=-1){
        note.tags.splice(note.tags.indexOf(past),1,present);
        ids.push(note.id);
      }
      return note;
    });
    if(ids.length>0){
      var newList=nList.filter((note)=>ids.includes(note.id));
      dbHandler(newList);
    }

    ids = [];
    nList=trashList;
    nList=nList.map((note)=>{
      if(note.tags.indexOf(past)!=-1){
        note.tags.splice(note.tags.indexOf(past),1,present);
        ids.push(note.id);
      }
      return note;
   });
    if(ids.length>0){
      var newList=nList.filter((note)=>ids.includes(note.id));
      trdbHandler(newList);
    }
  }

  const getView = ()=>{
    view==="grid"?setView("list"):setView("grid");
  }

  const updateNoteList = (list,typ) =>{
    if(typ=="del"){
      var deNote =noteList.filter(note => note.id==list[0].id)[0];
      Api.post("/trash",deNote,{headers: {'Content-Type': 'application/json; charset=UTF-8',"Access-Control-Allow-Origin": "*"}})
      .then(setTrashList([...trashList,noteList.filter(note => note.id==list[0].id)[0]]));
      Api.delete(`/notes/${deNote.id}`)
      .then(setNoteList(noteList.filter(note => note.id!=list[0].id)))
    }
    else if(typ=="tdel" || typ=="ck" || typ=="img"|| typ=="up"){
      Api.put(`/notes/${list.id}`,noteList.filter((nt)=>nt.id===list.id)[0])
      .then(setNoteList(noteList.map(note => {
        if(note.id==list.id){
          return list;
        }
        return note;
      })));
    }
  }

  const restore = (id)=>{
    var k= trashList.filter(note => note.id==id);
    Api.post(`/notes`,k[0])
    .then(
      setNoteList([...noteList,k[0]]))
    Api.delete(`/trash/${id}`)
    .then(
      setTrashList(trashList.filter(note => note.id!=id)))
  }

  const deleteForever = (id)=>{
    Api.delete(`/trash/${id}`)
    .then(
      setTrashList(trashList.filter(note => note.id!=id)))
  }

  const addNewNote = async(note) =>{
    note.id=uuidv4();
    var upList = noteList.slice();
    upList.push(note);
    Api.post("/notes",note,{headers: {'Content-Type': 'application/json; charset=UTF-8',"Access-Control-Allow-Origin": "*"}}).then(()=>{
      setNoteList(upList)
    });
  }

  const getEditNote = (id)=>{
    const evt = new CustomEvent("custevt", { bubbles: true ,detail: {id: id}});

    document.dispatchEvent(evt);
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
      var note = newList.filter(nt=>nt.id===targetNote)[0];
      Api.put(`/notes/${targetNote}`,note);
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
      var note = newList.filter(nt=>nt.id===targetNote)[0];
      Api.put(`/notes/${targetNote}`,note);
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
      var note = newList.filter(nt=>nt.id===targetNote)[0];
      Api.put(`/notes/${targetNote}`,note);
      setNoteList(newList);
    }
    e.stopPropagation();
  }

  const setSerVal = () =>{
    setSearchVal(tId.current.value);
    if(!allTagList.includes(tId.current.value) && tId.current.value!=""){
      setAddDisplay("inherit");
    }
    else{
      setAddDisplay("none");
    }
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
    var nav = document.getElementsByClassName("nav");
    var navTag = document.getElementsByClassName("navTag");
    if(isMobile){
      if(nav[0].classList.contains("mobileTrans")){
        nav[0].classList.remove("mobileTrans");
        nav[0].classList.add("navToggleClass1");
        Array.from(navTag).forEach((tag)=>{
          tag.classList.add("hideTag");
        });
      }
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
    var note = noteList.filter((nt)=>nt.id===lid)[0]
    note.archived=bl
    Api.put(`/notes/${note.id}`,note);
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
          <span className="editLabelsListAdd" id="editLabelsListAdd" style={{display:addDisplay}} onClick={createLabel}>
              {
                `+ Create "${tId.current.value}"`
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
      <Header isMobile={isMobile} navToggler={navToggler} getView={getView} noteList={noteList} setFList={setFList} view={view}/>
      <span className="content" id="content">
        <Nav navMode={navMode} allTagList={allTagList}  />
        <span className={`nonNav nonNavToggleClass${navMode} `}>
        <Routes>
        <Route 
          path='/'
          element={
            <>
              <Takenote addNewNote={addNewNote} setTargetNote={setTargetNote} curTags={curTags} tagRemover={tagRemover} noteList={noteList} />
              <Notelist view={view} noteList={noteList.filter((note)=>note.archived==false)} setNoteList={updateNoteList} setTargetNote={setTargetNote} mergeLists={mergeLists} tp={"note"} del={deleteForever} res={restore} getEditNote={getEditNote} />
            </>
          }

          />
        <Route 
          path='/archive'
          element={
              <Notelist view={view} noteList={noteList.filter((note)=>note.archived==true)} setNoteList={updateNoteList} setTargetNote={setTargetNote} mergeLists={mergeLists} tp={"note"} del={deleteForever} res={restore} getEditNote={getEditNote} />
          } />

        <Route 
          path='/search'
          element={
            <>
              <Notelist view={view} noteList={fList} setNoteList={updateNoteList} setTargetNote={setTargetNote} mergeLists={mergeLists} tp={"note"} del={deleteForever} res={restore} getEditNote={getEditNote} />
            </>
          } />
        <Route 
          path='/trash'
          element={
              <Notelist view={view} noteList={trashList} setNoteList={updateNoteList} setTargetNote={setTargetNote} mergeLists={mergeLists} tp={"trash"} del={deleteForever} res={restore} />
          } />
          {
            allTagList.map((tag)=>{
              return (
                <Route
                key={tag}
                path='/tags/:tag'
                element={
                  <>
                    <Takenote addNewNote={addNewNote} setTargetNote={setTargetNote} curTags={curTags} tagRemover={tagRemover} noteList={noteList} />
                    <Notelist view={view} noteList={noteList} setNoteList={updateNoteList} setTargetNote={setTargetNote} mergeLists={mergeLists} tp={"tag"} del={deleteForever} res={restore} getEditNote={getEditNote} />
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
