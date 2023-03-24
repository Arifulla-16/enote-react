import React, { useState } from 'react'

function Note(props) {

    var {id,title,text,list,checkList,tags,images,tagRemover,noteRemover,checkUpdate} = props;


    const delTag = (el) => {
        var tg = el.currentTarget.getAttribute("tg");
        var tarId = el.currentTarget.getAttribute("uid");
        tagRemover(tarId,tg);
    }

    const delNote = (el) => {
        var tarId = el.currentTarget.getAttribute("uid");
        console.log(tarId);
        noteRemover(tarId);
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
        if (file) {
            img.setAttribute("src",URL.createObjectURL(file));
            img.setAttribute("alt","image");
        }
        var target = document.querySelector(`div[uid='${e.target.attributes["uid"].value}']`);
        target = target.querySelector(".images");
        target.prepend(img);
        e.target.value=null;
    }

  return (

    <div className='note' uid={id}>
        <span className="images">
        {/* <img src={require("../../images/1.jpg")} alt="image1" />
        <img src={require("../../images/2.jpg")} alt="image2" /> */}
        {
            images.map((img)=>{
               return <img src={require(`../../images/${img}.jpg`)} alt={`image${img}`} />
            })
        }
        </span>
        <span className="noteContent">
            <span className="notePin hider">
                <i className="fa-solid fa-thumbtack curs"></i>
            </span>
            <span className="noteTitle">
                {title}
            </span>
            <span className="noteText">
                {text!="" && text}
                {text=="" && <ul>{
                    list!=[] && list.map((item,idx)=>{
                        return (<div className="noteCheckList">
                                    <input type="checkbox" name="checker" idx={idx} uid={id} checked={checkList[idx]} onChange={handleCheck} className="listChecker"/>
                                    <li>{item}</li>

                                </div>)
                    })}
                    </ul>
                    }
            </span>
            <span className="noteLabels" id="noteLabels">
                {
                    tags.map((tag)=>{
                        return (<span className="noteLabel">
                                    <span>{tag}</span>
                                    <div id="labelDel" onClick={delTag} tg={tag} uid={id}>
                                        <i className="fa-solid fa-xmark fa-xl curs"></i>
                                    </div>
                                </span>)
                    })
                    
                }
            </span>
            <span className="noteOptions hider">
                {/*icons*/}
                <i className="fa-solid fa-palette curs add"></i>
                <label className="custom-file-upload">
                    <input type="file" id="imgUpload" uid={id} onChange={showImg}/>
                    <i className="fa-regular fa-image curs add"></i>
                </label>
                <i className="fa-solid fa-box-archive curs add"></i>
                <i className="fa-solid fa-trash curs add" onClick={delNote} uid={id}></i>
                <i className="fa-solid fa-tags curs add"></i>
            </span>
        </span>
    </div>
  )
}

export default Note;