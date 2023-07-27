import React, { useState,useEffect,useRef } from 'react'
import { Link ,useLocation , useNavigate} from "react-router-dom";

function Header(props) {
  var searchKey = useRef("");


  const toggleView = ()=>{
    props.getView();
  };

  const navigate = useNavigate();

  var [serchBarVisibility,setVisibility] = useState("hidden");
  var [appName,setAppName]=useState(useLocation().pathname);

  useEffect(()=>{
    setAppName(window.location.pathname);
  },[useLocation().pathname]);

  const handleSearch=(e)=>{
    var dict = { 
                  "#ffffff":"none",
                  "#f38a82":"red",
                  "#fbbc04":"orange",
                  "#fef575":"yellow",
                  "#ccff90":"green",
                  "#a6feeb":"teallightblue",
                  "#cbf1f9":"blue",
                  "#afcafa":"darkBlue",
                  "#d7affa":"purple",
                  "#fccfe9":"pink",
                  "#e6c8a9":"brown",
                  "#e9ebed":"gray",
                  "rgb(243, 138, 130)":"red",
                  "rgb(251, 188, 4)":"orange",
                  "rgb(254, 245, 117)":"yellow",
                  "rgb(204, 255, 144)":"green",
                  "rgb(166, 254, 235)":"teallightblue",
                  "rgb(203, 241, 249)":"blue",
                  "rgb(175, 202, 250)":"darkBlue",
                  "rgb(215, 175, 250)":"purple",
                  "rgb(252, 207, 233)":"pink",
                  "rgb(230, 200, 169)":"brown",
                  "rgb(233, 235, 237)":"gray"
                }
    searchKey.current = e.target.value;
    var list  = props.noteList;
    if(searchKey.current!==""){
      list=list.filter((json)=>{
        let j2 = Object.assign({}, json);
        j2.bgColor=dict[j2.bgColor];
        j2.bgImage==="none" && delete j2.bgImage;
        j2.archived===true?j2.archived="archieved":delete j2.archived;

        delete j2.checkList;delete j2.id;delete j2.pinned;delete j2.__v;delete j2._id;
        var str = Object.values(j2);
        return (str.join(" ").toLowerCase().includes(searchKey.current.toLowerCase()));
      })
      props.setFList(list);
    }
    else{
      props.setFList([]);
    }
  }

  const toggleSearchBar=()=>{
    if(serchBarVisibility==="hidden"){
      setVisibility("show")
    }
    else{
      setVisibility("hidden")
      navigate(-1);
    }
  }

  document.addEventListener("click",()=>{
    if(window.location.pathname!="/search" && serchBarVisibility==="show"){
      setVisibility("hidden")
    }
  })

  return (
    <div className='header'>
        <span className="menuToggle">
          {/* icon */}
          <span className='icAni' onClick={props.navToggler}>
            <i className="fa-solid fa-bars fa-xl " ></i>
          </span>
        </span>
        <span className="appTitle" id="appTitle">
          {
            !appName.includes("/tags")?(appName.slice(1)==""?"Enote":(appName.slice(1).charAt(0).toUpperCase()+appName.slice(1).substring(1)).replace(/%20/g," ")):(appName.slice(6).charAt(0).toUpperCase()+appName.slice(6).substring(1)).replace(/%20/g," ")
          }
        </span>
        <span className="search">
          <span className={`serchBar ${serchBarVisibility==="hidden"?"hideSearch":""}`}>
            <i className={`fa-solid fa-arrow-left fa-xl arrow`} onClick={toggleSearchBar}></i>
            <input type="search" name="searchBar" id="searchBar" placeholder='Search' onChange={handleSearch} />
          </span>
          <Link to="/search">
            <i className="fa-solid fa-magnifying-glass  fa-xl " style={{"color":"#000000"}} onClick={toggleSearchBar}></i>
          </Link>
        </span>
        <span className="toggleView" onClick={toggleView}>
          <i className={`fa-solid fa-grip${props.view==="grid"?"":"-lines"} fa-xl ${props.isMobile===true?"hide":""} `} ></i>
        </span>
        <span className="profile">
          <span className='circler'>
            <i className="fa-regular fa-user fa-xl"></i>
          </span>
        </span>
    </div>
  )
}

export default Header;