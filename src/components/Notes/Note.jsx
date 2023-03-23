import React from 'react'

function Note() {
  return (
    <div className='note'>
        <span className="images">
        <img src={require("../../images/000107507.jpg")} alt="image1" />
        <img src={require("../../images/000107510.jpg")} alt="image2" />
        </span>
        <span className="noteContent">
            <span className="notePin hider">
                <i className="fa-solid fa-thumbtack curs"></i>
            </span>
            <span className="noteTitle">
                Arif
            </span>
            <span className="noteText">
                React Practice
            </span>
            <span className="noteLabels">
                <span className="noteLabel">
                    study
                </span>
                <span className="noteLabel">
                    home
                </span>
            </span>
            <span className="noteOptions hider">
                {/*icons*/}
                <i className="fa-solid fa-palette curs add"></i>
                <i className="fa-regular fa-image curs add"></i>
                <i className="fa-solid fa-box-archive curs add"></i>
                <i className="fa-solid fa-trash curs add"></i>
                <i className="fa-solid fa-tags curs add"></i>
            </span>
            {/* <span className="nonPosIcons">
                <span className="notePin">
                    <i className="fa-solid fa-thumbtack"></i>
                </span>
                <span className="noteSelect">
                    <i className="fa-solid fa-circle-check"></i>
                </span>
            </span> */}
        </span>
    </div>
  )
}

export default Note;