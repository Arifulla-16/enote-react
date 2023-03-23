import React, { useState } from 'react'

function Takenote() {
  var [inputFocus,setInputFocus] = useState("off");
  var [listFocus,setListFocus] =  useState("off");
  const toggleFocus=()=>{
    setInputFocus("on");
  }
  const focusOut=()=>{
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
  // const handle = (e)=>{
  //   console.log(e);
  //   e.remove();
  // }
  const itemAdder = (e)=>{
    var span = document.createElement('span');
    span.setAttribute('class', 'addedItem addItem');
    span.innerHTML = `<span class="newList">
                        <input type="checkbox" name="itemStatus" id="itemStatus" />
                      </span>
                      <input type="text" name="itemValue" id="itemValue" value="" class="takeNoteInput" />
                      <span class="newList">
                        <i class="fa-solid fa-xmark del blacken"></i>
                      </span>`;
    document.getElementById("additionHelper").prepend(span);
    var addInput = document.getElementById("addItem");
    // var addedItem = document.getElementById("additionHelper").firstChild.getElementById("itemValue");
    var addedItem = document.querySelector("#additionHelper");
    addedItem= addedItem.firstChild; 
    addedItem.querySelector("#itemValue+span>i").addEventListener('click',()=>{
      addedItem.remove();
    });
    var it = addedItem.querySelector("#itemValue");
    var val = e.target.value;
    addInput.blur();
    addInput.setAttribute('value', '');
    it.setAttribute('value', val);
    it.setSelectionRange(it.value.length,it.value.length,"forward");
    it.focus();
  }
  return (
    <div className='takeNoteContainer'>
      <div className={` ${inputFocus==="on" || listFocus==="on"?"takeNoteTitle":"hideTag"}`}>
        <input type="text" name="takeNoteTitle" id="takeNoteTitle" className='takeNoteInput' placeholder='Title' />
        <span className="newList">
          <i className="fa-solid fa-thumbtack curs blacken"></i>
        </span>
      </div>
      <div className={`${inputFocus==="off"?"boxShadow":""} ${listFocus==="on"?"hideTag":"takeNote"}`}>
          <input type="text" name="takeNote" id="takeNote" className='takeNoteInput' placeholder='Take a Note...' onFocus={toggleFocus} />
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