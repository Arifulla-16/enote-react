import React, { useState } from 'react'

function Note(props) {
    var {note,tagRemover,noteRemover,checkUpdate,setTargetNote,updatePin,psy,noteArchive,imgAdd} = props;
    var {id,title,text,list,checkList,tags,images,bgImage,bgColor,pinned} = note;


    const delTag = (el) => {
        var tg = el.currentTarget.getAttribute("tg");
        var tarId = el.currentTarget.getAttribute("uid");
        tagRemover(tarId,tg);
    }

    const delNote = (el) => {
        var tarId = el.currentTarget.getAttribute("uid");
        noteRemover(tarId);
    }

    const archiveNote = (el)=>{
        var tarId = el.currentTarget.getAttribute("uid");
        noteArchive(tarId,!note.archived);
    }

    const handleCheck = (e) =>{
        var tarId = e.currentTarget.getAttribute("uid");
        var ck = e.target.attributes["idx"].value;
        var cked = e.target.checked;
        checkUpdate(tarId,ck,cked);
    }

    const showImg = (e)=>{
        var img = document.createElement("img");
        const [file] = e.target.files;
        var tarId = e.currentTarget.getAttribute("uid");
        var c="";
        if (file) {
            c=URL.createObjectURL(file);
            img.setAttribute("src",c);
            img.setAttribute("alt","image");
        }
        var target = document.querySelector(`div[uid='${e.target.attributes["uid"].value}']`);
        target = target.querySelector(".images");
        target.prepend(img);
        imgAdd(tarId,c);
        e.target.value=null;
    }

    const displayPalette = (e) =>{
        setTargetNote(e.target.attributes["uid"].value);
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

    const showList = (e) => {
        setTargetNote(e.target.attributes["uid"].value);
        var palette = document.getElementById("editLabels");
        if(document.getElementById("palette").style.display !== 'none'){
            document.getElementById("palette").style.display = 'none';
          }
        var checks = palette.querySelectorAll(".editLabelsList>span");
        checks.forEach((child)=>{
            var ar = Array.from(child.children);
            ar.forEach((c,idx)=>{
                if(c.checked!=undefined && tags.includes(ar[idx+1].innerText)){
                    c.checked=true;
                }
                else if(c.checked!=undefined){
                    c.checked=false;
                }
            });
        });
        palette.style.position = "absolute";
        palette.style.top = `${e.pageY}px` ;
        (window.innerWidth-e.pageY<250)?(palette.style.left = `${window.innerWidth-250}px`):(palette.style.left = `${e.pageX}px`);
        palette.style.display = 'flex';
        e.stopPropagation();
    }

    const togglePin = (e) => {
        updatePin(e.target.attributes["uid"].value,!pinned);
        e.stopPropagation();
    }

    var style={};
    if(psy=="p"){
        style={color:"black",textDecoration:"none"}
    }
    else{
        style={background: "linear-gradient(to left top, transparent 44%, black 45%, black 55%, transparent 56%)",color:"#00000080"};
    }


  return (

    <div className='note' uid={id}>
        <span className="images">
        {
            images.map((img)=>{
               return <img key={img} src={img} alt={`image${img}`} />
            })
        }
        </span>
        <span className="noteContent" style={{backgroundImage:bgImage,backgroundColor:bgColor}}>
            <span className="notePin hider">
                <i className={`fa-solid fa-thumbtack curs`} style={style} uid={id} onClick={togglePin}> </i>
            </span>
            <span className="noteTitle">
                {title}
            </span>
            <span className="noteText">
                {text!="" && text}
                {text=="" && <ul>{
                    list!=[] && list.map((item,idx)=>{
                        return (<div key={item} className="noteCheckList">
                                    <input type="checkbox" name="checker" idx={idx} uid={id} checked={checkList[idx]} onChange={handleCheck} className="listChecker"/>
                                    <li>{item}</li>

                                </div>)
                    })}
                    </ul>
                    }
            </span>
            <span className="noteLabels" id="noteLabels" uid={id}>
                {
                    tags.map((tag)=>{
                        return (<span key={tag} className="noteLabel">
                                    <span>{tag}</span>
                                    <div id="labelDel" onClick={delTag} tg={tag} uid={id}>
                                        <i className="fa-solid fa-xmark fa-xl curs"></i>
                                    </div>
                                </span>)
                    })
                    
                }
            </span>
            <span className="noteOptions hider ">
                {/*icons*/}
                <i className="fa-solid fa-palette curs add" onClick={displayPalette} uid={id} ></i>
                <label className="custom-file-upload">
                    <input type="file" id="imgUpload" uid={id} onChange={showImg}/>
                    <i className="fa-regular fa-image curs add"></i>
                </label>
                <i className="fa-solid fa-box-archive curs add" style={{color:`${note.archived==true?'#00000080':"#000000"}`}}  onClick={archiveNote} uid={id}></i>
                <i className="fa-solid fa-trash curs add" onClick={delNote} uid={id}></i>
                <i className="fa-solid fa-tags curs add" onClick={showList} uid={id}></i>
            </span>
        </span>
    </div>
  )
}

export default Note;