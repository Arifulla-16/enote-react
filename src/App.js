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
      "images":["3","1"],
      "bgImage":"https://www.gstatic.com/keep/backgrounds/notes_light_thumb_0615.svg",
      "bgColor":"#ccff90",
      "pinned":true
    },
    {
      "id":2,
      "title":"Def",
      "text":"",
      "list":["hulu","crunch","me"],
      "checkList":[true,false,false],
      "tags":["science","home"],
      "images":["4","2"],
      "bgImage":"none",
      "bgColor":"#fccfe9",
      "pinned":false
    },
    {
      "id":3,
      "title":"Ghi",
      "text":"Not mine",
      "list":[],
      "checkList":[],
      "tags":["misc","home"],
      "images":["1","2"],
      "bgImage":"none",
      "bgColor":"#a6feeb",
      "pinned":false
    }
  ]);
  var [allTagList,setAllTagList] = useState(["study","done","science","home","misc","new","note"]);
  var [idx,setIdx] = useState(3);
  var [navMode,setNavMode] = useState(0);
  var [targetNote,setTargetNote] = useState("");
  var [view,setView] = useState("grid");
  var [filteredList,setFilteredList] = useState([...allTagList]);
  // var [searchVal,setSearchVal] = useState("");

  const navToggler = ()=>{
    navMode===0?setNavMode(1):setNavMode(0);
  }

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
  }

  const setColor = (e) => {
    var color = e.target.attributes["style"].value.slice(18).slice(0,-1);
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

  const setImg = (e) => {
    var img = e.target.attributes["src"].value;
    img == "https://fonts.gstatic.com/s/i/googlematerialicons/image_not_supported/v12/gm_grey-24dp/1x/gm_image_not_supported_gm_grey_24dp.png"?img="none":img='url('.concat(img).concat(')');
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

  const handleCheck = (e) => {
    var tag = e.target.attributes["tag"].value;
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
    e.stopPropagation();
  }

  // const filterTags = (e) => {
  //   var sVal = e.currentTarget.value;
  //   setSearchVal(sVal);
  //   if(searchVal.length<4){
  //     var tagList = allTagList.filter((tag)=>{
  //       // console.log(tag,searchVal,tag.includes(searchVal));
  //       var k = document.querySelector(".fa-tags[uid='".concat(targetNote).concat("']"));
  //       return (tag.includes(sVal));
  //     });
  //     setFilteredList(tagList);
  //   }
  //   else{
  //     setFilteredList([...allTagList]);
  //   }
  // }

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


  return (
    <div>
      <Header navToggler={navToggler} getView={getView}/>
      <span className="content" id="content">
        <Nav navMode={navMode} allTagList={allTagList}/>
        <span className={`nonNav nonNavToggleClass${navMode} `}>
          <Takenote addNewNote={addNewNote}/>
          <Notelist view={view} noteList={noteList} setNoteList={updateNoteList} setTargetNote={setTargetNote}/>
        </span>
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
                                                                      {/* onChange={filterTags} value={searchVal} */}
              <input type="text" name="labelSearch" id="labelSearch" placeholder="Enter label name" />
              <i className="fa-solid fa-magnifying-glass labelSearchIcon"></i>
            </span>
            <span className="editLabelsList">
              {
                filteredList.map((tag)=>{
                  return (<span className="editLabelsItem">
                            <input type="checkbox" tag={tag} className="editLabelsItemCheck" onChange={handleCheck} name="labelInclusion" id="labelInclusion" />
                            <span className="editLabelsItemName" chk="false">{tag}</span>
                          </span>)
                })
              }
            </span>
          </span>
      </span>
    </div>
  );
}

export default App;
