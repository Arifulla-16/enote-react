import React, { useState } from 'react'

function Takenote(props) {
  var [inputFocus,setInputFocus] = useState("off");
  var [listFocus,setListFocus] =  useState("off");
  var [titleVal,setTitleVal] = useState("");
  var [noteVal,setNoteVal] = useState("");
  var [listVal,setListVal] = useState([]);
  var [listValCheck,setListValCheck]=useState([]);

  const toggleFocus=()=>{
    setInputFocus("on");
  }

  const titleValSet = (e) =>{
    var title = e.target.value;
    setTitleVal(title);
  }

  const noteValSet = (e) =>{
    var title = e.target.value;
    setNoteVal(title);
  }

  const addNote = () =>{
    if(!(titleVal=="" && noteVal=="") && (listVal.length==0)){
      var note = {
        "id":"1",
        "title":titleVal,
        "text":noteVal,
        "tags":["new","note"],
        "images":[]
      };
      console.log(note);
      props.addNewNote(note);
      setTitleVal("");
      setNoteVal("");
    }
  }

  const addList = () =>{
    if((noteVal=="")&&(!(titleVal=="" && noteVal==""))){
      console.log(listVal);
      console.log(titleVal);
      var note = {
        "id":"1",
        "title":titleVal,
        "text":"",
        "list":listVal,
        "checkList":listValCheck,
        "tags":["new","note"],
        "images":[]
      };
      props.addNewNote(note);
      setTitleVal("");
      setListVal([]);
      setListValCheck([]);
    }
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
  }

  const listToggle = ()=>{
    setListFocus("on");
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
                      <input type="text" name="itemValue" id="itemValue" class="takeNoteInput" idx=${idx} value=${listVal[idx]} />
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
      console.log(e);
      var listNoVal = e.target.checked;
      var newCheckList = listValCheck;
      newCheckList[listNo]=listNoVal;
      setListValCheck(newCheckList);
      console.log(listValCheck);
      console.log(listVal);
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
        <input type="text" name="takeNoteTitle" id="takeNoteTitle" className='takeNoteInput' placeholder='Title' onChange={titleValSet} value={titleVal} />
        <span className="newList">
          <i className="fa-solid fa-thumbtack curs blacken"></i>
        </span>
      </div>
      <div className={`${inputFocus==="off"?"boxShadow":""} ${listFocus==="on"?"hideTag":"takeNote"}`}>
          <input type="text" name="takeNote" id="takeNote" className='takeNoteInput' placeholder='Take a Note...' onFocus={toggleFocus} onChange={noteValSet} value={noteVal}/>
          <span className="newList">
            <i className="fa-regular fa-square-check fa-xl blacken" onClick={listToggle}></i>
          </span>
      </div>

      <div className={` ${listFocus==="off"?"hideTag":"addItemList"}`} id="additionHelper">
          <span className="addItem">
            <span className="newList">
              <i className="fa-regular fa-add fa-xl"></i>
            </span>
            <input type="text" name="addItem" id="addItem" className='takeNoteInput' value="" placeholder='List item'  onChange={itemAdder}/>
          </span>
      </div>

      <div className={` ${inputFocus==="on" || listFocus==="on"?"takeNoteOptions":"hideTag"}`}>
        <span className="icons">
          <i className="fa-solid fa-palette curs add"></i>
          <i className="fa-regular fa-image curs add"></i>
          <i className="fa-solid fa-box-archive curs add"></i>
          <i className="fa-solid fa-trash curs add"></i>
          <i className="fa-solid fa-tags curs add"></i>
        </span>
          <div className="newList">
            <i className=" curs blacken " onClick={focusOut}>close</i>
          </div>
      </div>
    </div>
  )
}

export default Takenote;