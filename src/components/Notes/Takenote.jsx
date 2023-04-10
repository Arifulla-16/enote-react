import React, { useEffect, useState } from 'react'

function Takenote(props) {
  var [inputFocus,setInputFocus] = useState("off");
  var [listFocus,setListFocus] =  useState("off");
  var [titleVal,setTitleVal] = useState("");
  var [noteVal,setNoteVal] = useState("");
  var [listVal,setListVal] = useState([]);
  var [listValCheck,setListValCheck]=useState([]);
  var [psy,setPsy]=useState("p");
  var [archive,setArchive] = useState(false);

  const toggleFocus=()=>{
    setInputFocus("on");
  }

  const titleValSet = (e) =>{
    var title = e.target.value;
    setTitleVal(title);
  }
  
  var arStyle={};
  if(archive==false){
    arStyle={color:"#000000"}
  }
  else{
      arStyle={color:"#00000080"};
  }


  var style={};
    if(psy=="p"){
        style={color:"#00000065",textDecoration:"none"}
    }
    else{
        style={background: "linear-gradient(to left top, transparent 44%, black 45%, black 55%, transparent 56%)",color:"#00000080"};
    }

  const noteValSet = (e) =>{
    var title = e.target.value;
    setNoteVal(title);
  }

  const pinIt = () =>{
    psy=="p"?setPsy("unp"):setPsy("p");
  }

  const addNote = () =>{
    if(!(titleVal=="" && noteVal=="") && (listVal.length==0)){
      var target = document.querySelector(".takeNoteTitle");
      target = target.querySelector(".takeImages");
      target = target.querySelectorAll(".img");
      var igs=[];
      target.forEach((i)=>{
        igs.push(i.getAttribute("src"));
      });
      target=document.querySelector(".takeNoteContainer");
      var image = target.style.backgroundImage;
      target=document.querySelector(".takeNoteOptions");
      var clr= target.style.backgroundColor;
      var note = {
        "id":"1",
        "title":titleVal,
        "text":noteVal,
        "tags":[...props.curTags],
        "images":[...igs],
        "bgImage":image,
        "bgColor":clr,
        "pinned":psy=="p"?false:true,
        "archived":archive
      };
      props.addNewNote(note);
      setTitleVal("");
      setNoteVal("");
    }
  }

  const addList = () =>{
    if((noteVal=="")&&(!(titleVal=="" && noteVal==""))){
      var target = document.querySelector(".takeNoteTitle");
      target = target.querySelector(".takeImages");
      target = target.querySelectorAll(".img");
      var igs=[];
      target.forEach((i)=>{
        igs.push(i.getAttribute("src"));
      });
      target=document.querySelector(".takeNoteContainer");
      var image = target.style.backgroundImage;
      target=document.querySelector(".takeNoteOptions");
      var clr= target.style.backgroundColor;
      var note = {
        "id":"1",
        "title":titleVal,
        "text":"",
        "list":listVal,
        "checkList":listValCheck,
        "tags":[...props.curTags],
        "images":[...igs],
        "bgImage":image,
        "bgColor":clr,
        "pinned":psy=="p"?false:true,
        "archived":archive
      };
      props.addNewNote(note);
      setTitleVal("");
      setListVal([]);
      setListValCheck([]);
    }
  }

  const showImg = (e)=>{
    var img = document.createElement("img");
    const [file] = e.target.files;
    if (file) {
        img.setAttribute("src",URL.createObjectURL(file));
        img.setAttribute("alt","image");
        img.setAttribute("class","img");
    }
    var target = document.querySelector(".takeNoteTitle");
    target = target.querySelector(".takeImages");
    target.prepend(img);
    e.target.value=null;
  }

  const focusOut=()=>{
    addNote();
    addList();
    setInputFocus("off");
    var delList = document.getElementsByClassName("addedItem");
    Array.from(delList).forEach((el)=>{
      el.remove();
    });
    setListFocus("off");
    props.tagRemover(true);
    setPsy("p");
    setArchive(false);
    var t1 = document.querySelector(".takeNoteOptions");
    t1.style.backgroundColor="white";
    t1=document.querySelector(".takeNoteContainer");
    t1.style.backgroundImage="none";
    t1= document.querySelector(".takeNoteTitle");
    t1 = t1.querySelector(".takeImages");
    t1 = t1.querySelectorAll(".img");
    if(t1!=null){
    t1.forEach((i)=>{
        i.remove();
      })
    }
  }

  const listToggle = ()=>{
    setListFocus("on");
  }

  const delTag = (el) => {
    props.tagRemover(el.currentTarget.getAttribute("tg"));
  }

  const showList = (e) => {
    props.setTargetNote("TNT");
    var palette = document.getElementById("editLabels");
    if(document.getElementById("palette").style.display !== 'none'){
      document.getElementById("palette").style.display = 'none';
    }
    var checks = palette.querySelectorAll(".editLabelsList>span");
        checks.forEach((child)=>{
            var ar = Array.from(child.children);
            ar.forEach((c,idx)=>{
                if(c.checked!=undefined && props.curTags.includes(ar[idx+1].innerText)){
                    c.checked=true;
                }
                else if(c.checked!=undefined){
                    c.checked=false;
                }
            });
        });
    palette.style.position = "absolute";
    palette.style.top = `${e.pageY}px` ;
    palette.style.left = `${e.pageX}px` ;
    palette.style.display = 'flex';
    e.stopPropagation();
}

const displayPalette = (e) =>{
  props.setTargetNote("TNT");
  var palette = document.getElementById("palette");
  if(document.getElementById("editLabels").style.display !== 'none'){
      document.getElementById("editLabels").style.display = 'none';
    }
  palette.style.position = "absolute";
  palette.style.top = `${e.pageY}px` ;
  palette.style.left = `${e.pageX}px` ;
  palette.style.display = 'flex';
  e.stopPropagation();
}

  var idx = 0;
  const itemAdder = (e)=>{
    var newList = listVal;
    newList[idx] = e.target.value;
    setListVal(newList);
    var span = document.createElement('span');
    span.setAttribute('class', 'addedItem addItem');
    span.innerHTML = `<span class="newList">
                        <input type="checkbox" name="itemStatus" id="itemStatus" idx=${idx} " />
                      </span>
                      <input type="text" name="itemValue" id="itemValue" autocomplete="off" class="takeNoteInput" idx=${idx} value=${listVal[idx]} />
                      <span class="newList">
                        <i class="fa-solid fa-xmark del blacken"></i>
                      </span>`;
    var addContainer = document.getElementById("additionHelper");
    addContainer.prepend(span);
    var addInput = document.getElementById("addItem");
    var addedItem = addContainer;
    addedItem= addedItem.firstChild; 
    addedItem.querySelector("#itemValue+span>i").addEventListener('click',()=>{
      addedItem.remove();
    });
    addedItem.querySelector(".newList>input").addEventListener('click',(e)=>{
      var listNo = e.target.attributes["idx"].value;
      var listNoVal = e.target.checked;
      var newCheckList = listValCheck;
      newCheckList[listNo]=listNoVal;
      setListValCheck(newCheckList);
    });
    addedItem.querySelector("#itemValue").addEventListener('change',(e)=>{
      var listNo = e.currentTarget.getAttribute("idx");
      var listNoVal = e.target.value;
      var newList = listVal;
      newList[listNo] = listNoVal;
      var newCheckList = listValCheck;
      newCheckList.push(false);
      setListValCheck(newCheckList);
      setListVal(newList);
    });
    var it = addedItem.querySelector("#itemValue");
    addInput.blur();
    addInput.setAttribute('value', '');
    it.setSelectionRange(it.value.length,it.value.length,"forward");
    it.focus();
    idx=idx+1;
  }
  return (
    <div className='takeNoteContainer'>
      <div className={` ${inputFocus==="on" || listFocus==="on"?"takeNoteTitle":"hideTag"}`}>
        <span className="takeImages"></span>
        <span className="nonImages">
          <input type="text" name="takeNoteTitle" id="takeNoteTitle" className='takeNoteInput' autoComplete="off" placeholder='Title' onChange={titleValSet} value={titleVal} />
          <span className="newList">
            <i className="fa-solid fa-thumbtack curs blacken" onClick={pinIt} style={style}></i>
          </span>
        </span>
      </div>
      <div className={`${inputFocus==="off"?"boxShadow":""} ${listFocus==="on"?"hideTag":"takeNote"}`}>
          <input type="text" name="takeNote" id="takeNote" className='takeNoteInput' autoComplete="off" placeholder='Take a Note...' onFocus={toggleFocus} onChange={noteValSet} value={noteVal}/>
          <span className="newList">
            <i className="fa-regular fa-square-check fa-xl blacken" onClick={listToggle}></i>
          </span>
      </div>

      <div className={` ${listFocus==="off"?"hideTag":"addItemList"}`} id="additionHelper">
          <span className="addItem">
            <span className="newList">
              <i className="fa-regular fa-add fa-xl"></i>
            </span>
            <input type="text" name="addItem" id="addItem" className='takeNoteInput' autoComplete="off" value="" placeholder='List item'  onChange={itemAdder}/>
          </span>
      </div>

      <div className={` ${inputFocus==="on" || listFocus==="on"?"takeNoteOptions":"hideTag"}`}>
        <span className="tnList">
        {
          props.curTags.map((tag)=>{
            return (<span key={tag} className="noteLabel">
                      <span>{tag}</span>
                      <div id="labelDel" onClick={delTag} tg={tag} >
                          <i className="fa-solid fa-xmark fa-xl curs"></i>
                      </div>
                    </span>)
          }) 
        }
        </span>
        <span className="nonList">
          <span className="icons">
            <i className="fa-solid fa-palette curs add" onClick={displayPalette} ></i>
            <label className="custom-file-upload">
                    <input type="file" id="imgUpload" onChange={showImg}/>
                    <i className="fa-regular fa-image curs add"></i>
                </label>
            <i className="fa-solid fa-box-archive curs add" onClick={()=>{archive==true?setArchive(false):setArchive(true)}} style={arStyle}></i>
            <i className="fa-solid fa-tags curs add" onClick={showList}></i>
          </span>
          <div className="newList">
            <span className=" curs blacken " onClick={focusOut}>close</span>
          </div>
        </span>
      </div>
    </div>
  )
}

export default Takenote;